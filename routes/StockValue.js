
const express = require('express');
const router = express.Router(); // Express router is a class which helps us to create router handlers
const passport = require('passport');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const User = require('../models/User'); // Require User Schema
const Stock = require('../models/StockValue'); // Require Stock Schema
const http = require('http');   //Require http to send to app to make api calls
var nodemailer = require('nodemailer'); // sent email to user

mongoose.set('useFindAndModify', false);

require('dotenv').config();

// Require symbol from app.js
symbol = require('../app');

// Take user's id min max and stocks symbol from userpage
router.post('/getValue/:symbol/:min/:max', (req, res) => {

    //Define them and create new Schema in database
    const user = req.user._id;
    const symbol = req.params.symbol;
    const mins = req.params.min;
    const maxs = req.params.max;
    const { id, stockName, min, max } = { id: user, stockName: symbol, min: mins, max: maxs };

    // Find if user has already add values for min max for the stock 
    Stock.findOne({ id: user, stockName: symbol }).then(result => {

        if (result) {

            // Update min value
            Stock.findOneAndUpdate({ id: user, stockName: symbol }, { '$set': { min: mins } }, (err, doc) => {

                if (err) {

                    console.log("Something wrong when updating data!");
                }

                console.log(doc);
            });

            // Update max value
            Stock.findOneAndUpdate({ id: user, stockName: symbol }, { '$set': { max: maxs } }, (err, doc) => {

                if (err) {

                    console.log("Something wrong when updating data!");
                }

                console.log(doc);
            });
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


var minutes = 10, the_interval = minutes * 60 * 1000; //Define in how many minutes you want interval to run 
var close_array_Real = [];
var userEmail;  //Define user to send email

// Loop running every 5 minutes and call Apis
setInterval(function () {

    // Find in DB the reminders for stock price and put it to an array
    Stock.find({}).then(result => {

        result = JSON.parse(JSON.stringify(result));
        const name = 'stockName';
        const time = "Time Series (5min)";
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

                http.request(options, function (res) {

                    res.setEncoding('utf8'); // Set encode to data 

                    resolve(res.on('data', function (chunk) {

                        number = 1;
                        var temp = JSON.parse(chunk.toString()); // Convert chunck to string and then to json
                        const json_length = Object.keys(temp[time]).length; // Length of json
                        length = json_length - 1;

                        for (var date in temp["Time Series (5min)"]) { // Fill array with data

                            close_array_Real.push(temp[time][date]["4. close"]);
                        };
                    }));

                }).end();
            });
        }

        // Send email to the User 
        function sendEmail(mailOptions) {

            return new Promise(function (resolve) {

                var transporter = nodemailer.createTransport({

                    service: 'gmail',
                    auth: {

                        user: 'nstocksss@gmail.com',
                        pass: '282930nn'
                    }
                });

                resolve(transporter.sendMail(mailOptions, function (error, info) {

                    if (error) {

                        console.log(error);

                    } else {

                        console.log('Email sent: ' + info.response);
                    }
                }))
            });
        }

        // Find where to send the email
        function findEmail(i) {

            return new Promise(function (resolve) {

                //Find the User 
                User.find({ _id: result[i]['id'] }).then(user => {

                    user = JSON.parse(JSON.stringify(user));
                    userEmail = user[0]['email'];
                    console.log(userEmail);

                    var mailOptions = {

                        from: 'nickzte@gmail.com',
                        to: userEmail,
                        subject: 'Sending Email using Node.js',
                        text: 'Your stock is bigger than your max'
                    };

                    // Send email
                    resolve(sendEmail(mailOptions));
                })
            })
        }

        // Async for loop which wait the promises to continue iteration
        (async () => {

            // For every reminder in db 
            for (let i = 0; i < result.length; i++) {

                // Call Api 
                await HTTPget(i);

                // If reminder is true send email and delete max from db 
                if (close_array_Real[length] >= result[i]['max']) {

                    console.log("H metoxh perase to max");
                    await findEmail(i);

                    //Delete max
                    Stock.findOneAndUpdate({ stockName: result[i]['stockName'], id: result[i]['id'] }, { '$unset': { max: "" } }, (err, doc) => {

                        if (err) {

                            console.log("Something wrong when updating data!");
                        }

                        console.log(doc);
                    });
                }

                // If reminder is true send email and delete min from db 
                if (close_array_Real[length] <= result[i]['min']) {

                    console.log("H metoxh epese katw apoto min");
                    await findEmail(i);

                    //Delete Min
                    Stock.findOneAndUpdate({ stockName: result[i]['stockName'], id: result[i]['id'] }, { '$unset': { min: "" } }, (err, doc) => {

                        if (err) {

                            console.log("Something wrong when updating data!");
                        }

                        console.log(doc);
                    });
                }

                close_array_Real = [];  // Empty array 
            }
        })();
    });

    console.log("I am doing my 5 minutes check");
}, the_interval);

module.exports = router;