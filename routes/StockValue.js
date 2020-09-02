const express = require('express');
const router = express.Router(); // Express router is a class which helps us to create router handlers
const passport = require('passport');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const User = require('../models/User'); // Require User Schema
const Stock = require('../models/StockValue'); // Require Stock Schema
const http = require('http'); //Require http to send to app to make api calls
var nodemailer = require('nodemailer'); // sent email to user

require('dotenv').config();

Email = process.env.EMAIL;
Emailpass = process.env.EMAILPASS;

mongoose.set('useFindAndModify', false);

// Require symbol from app.js
symbol = require('../app');

// Take user's id min max and stocks symbol from userpage
router.post('/getValue/:symbol/:min/:max', (req, res) => {
  //Define them and create new Schema in database
  const user = req.user._id;
  const symbol = req.params.symbol;
  const mins = req.params.min;
  const maxs = req.params.max;
  const { id, stockName, min, max } = {
    id: user,
    stockName: symbol,
    min: mins,
    max: maxs,
  };

  // Find if user has already add values for min max for the stock
  Stock.findOne({ id: user, stockName: symbol }).then((result) => {
    if (result) {
      if (mins != 'null') {
        // Update min value
        Stock.findOneAndUpdate(
          { id: user, stockName: symbol },
          { $set: { min: mins } },
          (err, doc) => {
            if (err) {
              console.log('Something wrong when updating data!');
            }

            console.log(doc);
          }
        );
      }

      if (maxs != 'null') {
        // Update max value
        Stock.findOneAndUpdate(
          { id: user, stockName: symbol },
          { $set: { max: maxs } },
          (err, doc) => {
            if (err) {
              console.log('Something wrong when updating data!');
            }

            console.log(doc);
          }
        );
      }
      res.json({ success: 'Updated Successfully', status: 200 });
    }

    // If user hasn't set min max for the stock create new at database
    else {
      const newStock = new Stock({
        id,
        stockName,
        min,
        max,
      });

      newStock.save();
    }
  });
});

var minutes = 5,
  the_interval = minutes * 60 * 1000; //Define in how many minutes you want interval to run
var close_array_Real = [];
var userEmail; //Define user to send email

// Loop running every 5 minutes and call Apis
setInterval(function () {
  var StartDate = new Date();
  var StartDay = StartDate.getDay();
  var StartHour = StartDate.getHours();
  var StartMin = StartDate.getMinutes();

  //   if (StartDay != 6 || StartDay != 0) {
  //     if (StartHour >= 16 && StartHour <= 23) {
  //       if (
  //         (StartHour == 16 && StartMin >= 35) ||
  //         (StartHour >= 17 && StartHour <= 22) ||
  //         (StartHour == 23 && StartMin == 0)
  //       ) {
  Stock.findOneAndDelete({
    max: { $exists: false },
    min: { $exists: false },
  }).then((result) => {});

  // Find in DB the reminders for stock price and put it to an array
  Stock.find({}).then((result) => {
    result = JSON.parse(JSON.stringify(result));
    const name = 'stockName';
    const time = 'Time Series (15min)';
    var length;

    // Function to make HTTP request on server to call Api
    function HTTPget(i) {
      // Return promise with the data from api call
      return new Promise(function (resolve) {
        var options = {
          port: process.env.PORT || 1200, // the port
          path: '/getAps/' + result[i][name] + '',
          method: 'get',
        };

        http
          .request(options, function (res) {
            res.setEncoding('utf8'); // Set encode to data

            resolve(
              res.on('data', function (chunk) {
                number = 1;
                var temp = JSON.parse(chunk.toString()); // Convert chunck to string and then to json
                const json_length = Object.keys(temp[time]).length; // Length of json
                length = json_length - 1;

                for (var date in temp['Time Series (15min)']) {
                  // Fill array with data

                  close_array_Real.push(temp[time][date]['4. close']);
                }
              })
            );
          })
          .end();
      });
    }

    // Send email to the User
    function sendEmail(mailOptions) {
      return new Promise(function (resolve) {
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: Email,
            pass: Emailpass,
          },
        });

        resolve(
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          })
        );
      });
    }

    // Find where to send the email
    function findEmail(i, text) {
      return new Promise(function (resolve) {
        //Find the User
        User.find({ _id: result[i]['id'] }).then((user) => {
          User.findOneAndUpdate(
            { _id: result[i]['id'] },
            { $push: { notification: text } },
            (err, doc) => {
              if (err) {
                console.log('Something wrong when updating data!');
              }

              console.log(doc);
            }
          );

          User.findOneAndUpdate(
            { _id: result[i]['id'] },
            { $set: { dot: 1 } },
            (err, doc) => {
              if (err) {
                console.log('Something wrong when updating data!');
              }

              console.log(doc);
            }
          );

          user = JSON.parse(JSON.stringify(user));
          userEmail = user[0]['email'];

          var mailOptions = {
            from: Email,
            to: userEmail,
            subject: 'Sending Email using Node.js',
            text: text,
          };

          // Send email
          resolve(sendEmail(mailOptions));
        });
      });
    }

    // Async for loop which wait the promises to continue iteration
    (async () => {
      // For every reminder in db
      for (let i = 0; i < result.length; i++) {
        // Call Api
        await HTTPget(i);
        // If reminder is true send email and delete max from db
        if (close_array_Real[length] >= result[i]['max']) {
          const text =
            result[i]['stockName'] +
            ' value is higher than ' +
            result[i]['max'];
          await findEmail(i, text);

          //Delete max
          Stock.findOneAndUpdate(
            { stockName: result[i]['stockName'], id: result[i]['id'] },
            { $unset: { max: '' } },
            (err, doc) => {
              if (err) {
                console.log('Something wrong when updating data!');
              }

              console.log(doc);
            }
          );
        }

        // If reminder is true send email and delete min from db
        if (
          close_array_Real[length] <= result[i]['min'] &&
          result[i]['min'] != 'null'
        ) {
          const text =
            result[i]['stockName'] + ' value is lower than ' + result[i]['min'];
          await findEmail(i, text);

          //Delete Min
          Stock.findOneAndUpdate(
            { stockName: result[i]['stockName'], id: result[i]['id'] },
            { $unset: { min: '' } },
            (err, doc) => {
              if (err) {
                console.log('Something wrong when updating data!');
              }

              console.log(doc);
            }
          );
        }

        close_array_Real = []; // Empty array
      }
    })();
  });
  //       }
  //     }
  //   }

  console.log('I am doing my 5 minutes check');
}, the_interval);

router.post('/deleteNotif/:target', (req, res) => {
  const target = req.params.target;
  const user = req.user._id;

  //Delete notification
  User.findOneAndUpdate(
    { _id: user },
    { $unset: { ['notification.' + target + '']: '' } }
  ).then((user) => {
    User.findOneAndUpdate(
      { _id: user },
      { $pull: { notification: null } },
      (err, doc) => {
        if (err) {
          console.log('Something wrong when updating data!');
        }

        console.log(doc);
      }
    );
  });
  res.json({ success: 'Updated Successfully', status: 200 });
});

router.post('/deleteStock/:target', (req, res) => {
  const target = req.params.target;
  const user = req.user._id;

  User.updateOne(
    { _id: user },
    { $pull: { stock: { $in: [target] } } },
    (err, doc) => {
      if (err) {
        console.log('Something wrong when updating data!');
      }

      console.log(doc);
    }
  );

  res.json({ success: 'Updated Successfully', status: 200 });
});

router.post('/deleteDot/:target', (req, res) => {
  const target = req.params.target;
  const user = req.user._id;

  User.findOneAndUpdate({ _id: user }, { $set: { dot: 0 } }, (err, doc) => {
    if (err) {
      console.log('Something wrong when updating data!');
    }

    console.log(doc);
  });

  res.json({ success: 'Updated Successfully', status: 200 });
});

module.exports = router;
