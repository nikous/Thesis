const express = require('express');
const router = express.Router();

//Index page
router.get('/', (req, res) => res.render('Homepage'));
router.get('/homepage', (req, res) => res.render('Homepage'));

//About Page
router.get('/about', (req, res) => res.render('About'));

//Stock Page
router.get('/stocks', (req, res) => res.render('Stocks'));

//Predictions Page
router.get('/predictions', (req, res) => res.render('Predictions'));



module.exports = router;