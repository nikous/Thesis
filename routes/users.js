const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Load User model
const User = require('../models/User');

// Load Stock model
const Stock = require('../models/StockValue');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {

    const { name, email, password, password2 } = req.body;
    const { stock } = { stock: 'TSLA' };

    let errors = [];

    // Conditions to Regiter client 
    if (!name || !email || !password || !password2) {

        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {

        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {

        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {

        res.render('register', {

            errors,
            name,
            email,
            password,
            password2
        });

    } else {

        // Find if Users email exist
        User.findOne({ email: email }).then(user => {

            if (user) {

                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });

            } else {

                // Make new User
                const newUser = new User({

                    name,
                    email,
                    password,
                    stock,
                });

                // encrypt password and save User to database
                bcrypt.genSalt(10, (err, salt) => {

                    bcrypt.hash(newUser.password, salt, (err, hash) => {

                        if (err) throw err;

                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {

                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );

                                res.redirect('/users/login');
                            })

                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

// Login handle 
router.post('/login', (req, res, next) => {

    // If successful login user redirect to Homepage else 
    // redirect to login in page
    passport.authenticate('local', {

        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true,

    })(req, res, next);
});

// Logout handler
router.get('/logout', (req, res) => {

    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/homepage');

});

module.exports = router;