const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const passport = require('passport');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const Stocks = require('../models/UserStocks');

symbol = require('../app');

//Index page
router.get('/', (req, res) => {


    if (passport.authenticate) {
        res.render('Homepage', {
            user: req.user,
            error: true

        })
    }
    else {
        res.render('Homepage', {
            error: false,

        })
    }
});


router.get('/homepage', (req, res) => {

    if (passport.authenticate) {
        res.render('Homepage', {
            user: req.user,
            error: true,

        })
    }
    else {
        res.render('Homepage', {
            error: false,

        })
    }
});


//About Page
router.get('/about', (req, res) => {
    if (passport.authenticate) {
        res.render('About', {
            user: req.user,
            error: true,

        })
    }
    else {
        res.render('About', {
            error: false,

        })
    }
});




//Stock Page
router.get('/stocks', (req, res) => {
    if (passport.authenticate) {
        res.render('Stocks', {
            user: req.user,
            error: true,
            // symbol: req.params.symbol
            symbol: symbol.symbol


        })

    }
    else {
        res.render('Stocks', {
            error: false,
            symbol: symbol.symbol
        })
    }
});

router.post('/stocks', (req, res) => {
    const { stock } = req.body;
    // const stock = "TSLA";
    console.log("H metoxh einai", stock);
    // const userName = req.User.name;
    const user = "Nick";

    console.log("To onoma tou xrhsth einai", user)
    const newStocks = new Stocks({
        user,
        stock
    });
    newStocks.save().then(user => {

        // res.render('Stocks');
    })

});


//Predictions Page
router.get('/predictions', (req, res) => res.render('Predictions'));

//UserPage
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {

        user: req.user

    })
});





module.exports = router;