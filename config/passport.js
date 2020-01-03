const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Require bcrypt to encrypt users password

// Load User model
const User = require('../models/User');

module.exports = function (passport) {

    // Use passport
    passport.use(

        // Search for email in database
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

            User.findOne({  // If found 

                email: email

            }).then(User => {

                // If not return message
                if (!User) {

                    return done(null, false, { message: 'That email is not registered' });
                }

                // Match password
                bcrypt.compare(password, User.password, (err, isMatch) => {

                    if (err) throw err;

                    if (isMatch) { // If match Log in user

                        return done(null, User);
                    }

                    else { // Else throw error message

                        return done(null, false, { message: 'Password incorrect' });
                    }
                });
            });
        })
    );

    // Save user.id  to session
    passport.serializeUser(function (User, done) {

        done(null, User.id);
    });

    //  In deserializeUser the user.id is 
    // matched with the in memory
    //  array / database or any data resource.
    passport.deserializeUser(function (id, done) {

        User.findById(id, function (err, User) {

            done(err, User);
        });
    });
};
