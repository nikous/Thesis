const express = require('express');
const router = express.Router(); // Express router is a class which helps us to create router handlers
const passport = require('passport');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const User = require('../models/User'); // Require User Schema

mongoose.set('useFindAndModify', false);

// Require symbol from app.js
symbol = require('../app');

// Index page
router.get('/', (req, res) => {
  // If User connected send user data to client side
  if (passport.authenticate) {
    res.render('Homepage', {
      user: req.user,
      error: true,
    });
  } else {
    res.render('Homepage', {
      error: false,
    });
  }
});

// Homepage
router.get('/homepage', (req, res) => {
  // If User connected send user data to client side
  if (passport.authenticate) {
    res.render('Homepage', {
      user: req.user,
      error: true,
    });
  } else {
    res.render('Homepage', {
      error: false,
    });
  }
});

// About Page
router.get('/about', (req, res) => {
  // If User connected send user data to client side
  if (passport.authenticate) {
    res.render('About', {
      user: req.user,
      error: true,
    });
  } else {
    res.render('About', {
      error: false,
    });
  }
});

// Stock Page
router.get('/stocks', (req, res) => {
  // If User connected send user data to client side
  if (passport.authenticate) {
    res.render('Stocks', {
      // Send Stock name from server to client
      symbol: symbol.symbol,
      user: req.user,
      error: true,
    });
  } else {
    res.render('Stocks', {
      error: false,
      symbol: symbol.symbol,
    });
  }
});

// Get stocks name
router.post('/getStock/:symbol', (req, res) => {
  // Find user in database by id
  const user = req.user._id;
  const symbol = req.params.symbol;
  //Find if user has already follwed stock
  User.findOne({ _id: user, stock: symbol }).then((result) => {
    if (result) {
      console.log('already exist');
    } else {
      // Add stock to database
      User.findOneAndUpdate(
        { _id: user },
        { $push: { stock: req.params.symbol } },
        (err, doc) => {
          if (err) {
            console.log('Something wrong when updating data!');
          }

          console.log(doc);
        }
      );
    }
  });
});

//Login handle
router.post('/login', (req, res, next) => {
  //If successful login user redirect to Homepage else
  //redirect to login in page
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
});

//Response user data
router.get('/getUser', (req, res) => {
  res.json(req.user);
});

//UserPage
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard', {
    user: req.user,
  });
});

router.get('/getDBdata/:an', ensureAuthenticated, async (request, response) => {
  const an = await request.user;

  response.json(an);
});

module.exports = router;
