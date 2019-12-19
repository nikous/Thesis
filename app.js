const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const fetch = require('node-fetch');
const app = express();

// require('chartjs-plugin-crosshair');
// app.use('chartjs-plugin-crosshair', express.static(__dirname + '/node_modules/chartjs-plugin-crosshair/dist/'));



//Require .env to server
require('dotenv').config();

// Passport Config
require('./config/passport')(passport);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(
        db,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({ extended: true }));

//Express-session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

app.use(passport.initialize());
app.use(passport.session());


//connect flash
app.use(flash());

//Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

//Middleware for my static files
app.use('/public', express.static('public'));

//Middleware for my incoming json data
app.use(express.json());

//Take Stocks name from use call Api and send response to client
app.get('/getApi/:symbol', async (request, response) => {
    const api_key = process.env.API_KEY;
    const symbol = request.params.symbol;
    const api_url = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=' + symbol + '&apikey=' + api_key + '';
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();

    console.log(request.params.symbol);
    console.log(api_url);


    response.json(json);

    exports.symbol = request.params.symbol;
});

app.get('/getAp/:symbol', async (request, response) => {
    const api_key = process.env.API_KEY;
    const symbol = request.params.symbol;
    const api_url_daily = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + symbol + '&outputsize=compact&apikey=' + api_key + '';
    const fetch_response_daily = await fetch(api_url_daily);
    const dailyjson = await fetch_response_daily.json();

    console.log(request.params.symbol);
    console.log(api_url_daily);

    response.json(dailyjson);

});

app.get('/getAps/:symbol', async (request, response) => {
    const api_key = process.env.API_KEY;
    const symbol = request.params.symbol;
    const api_url_Real = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + symbol + '&interval=5min&outputsize=compact&apikey=' + api_key + '';
    const fetch_response_Real = await fetch(api_url_Real);
    const Realjson = await fetch_response_Real.json();

    console.log(request.params.symbol);
    console.log(api_url_Real);

    response.json(Realjson);

});

app.post('/getApi', (request, response) => {
    console.log('I got a request');
    console.log(request.body);
    console.log(request.array);
    response.json(request.body);
});

const PORT = process.env.PORT || 1200;

app.listen(PORT, console.log(`Server started on port ${PORT}`));