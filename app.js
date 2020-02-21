// Web application framework for Node. js to bulit servers
const express = require('express');

// Require it to use ejs 
const expressLayouts = require('express-ejs-layouts');

// Mongoose provides a straight-forward, 
// schema-based solution to model your application data.
const mongoose = require('mongoose');

// flash is a special area of the session used for storing messages
const flash = require('connect-flash');

// Require expres session to communicate data to middleware that's 
// executed later, or to retrieve it later on, on subsequent requests.
const session = require('express-session');

// Require passport to authenitcate user to login 
const passport = require('passport');

// Require fetch to rovides a JavaScript
// interface for accessing and manipulating 
// parts of the HTTP pipeline, such as requests and responses
const fetch = require('node-fetch');

// Start express
const app = express();

// Require .env to server
require('dotenv').config();

// Passport Config
require('./config/passport')(passport);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// DB Config
const db = require('./config/keys').mongoURI;

const PORT = process.env.PORT || 1200;

const MongoClient = require('mongodb').MongoClient;
var http = require('http').createServer(app);
http.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`);
});
const io = require('socket.io')(http);


// change based on your mongodb connection instance

// MongoClient.connect(db,
//     { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(client => {

//         const db = client.db("test");
//         const collection = db.collection("users");

//         const changeStream = collection.watch();
//         changeStream.on("change", function (change) {
//             io.emit('new-notification', change);
//             // console.log(change);
//         });
//     });


io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('new-notification', function (msg) {
        io.emit('new-notification', msg);
    });

});


// io.on('new-notification', function (msg) {
//     console.log('notification------------------------------> : ' + msg);
// });

const User = require('./models/User');
// Connect to MongoDB
mongoose

    .connect(

        db,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )

    .then(() => {
        console.log('MongoDB Connected')

        const notification = mongoose.model('User');

        // Create a change stream. The 'change' event gets emitted when there's a
        // change in the database
        // notification.watch({}).
        notification.watch({ 'fullDocument': 'updateLookup' }).
            on('change', function (change) {
                io.emit('new-notification', change);
                // console.log(change);
                console.log(new Date(), change);
            });


        // data => console.log(new Date(), data)
    })
    .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');


// Bodyparser
app.use(express.urlencoded({ extended: true }));

// Express-session
app.use(

    session({

        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// Use passport
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global vars
app.use((req, res, next) => {

    // Messages
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');

    next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/', require('./routes/StockValue.js'));

// Middleware for my static files
app.use('/public', express.static('public'));

// Middleware for my incoming json data
app.use(express.json());

// Take Stocks name from clinet, calls Api and send response to client
// Weekly
app.get('/getApi/:symbol', async (request, response) => {

    const api_key = process.env.API_KEY;    // Takes api key from .env file
    const symbol = request.params.symbol;
    const api_url = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=' + symbol + '&apikey=' + api_key + '';
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();       // Wait to fetch json from api

    console.log(request.params.symbol);
    console.log(api_url);

    response.json(json);    // Send response to client
    exports.symbol = request.params.symbol;
});

// Take Stocks name from clinet, calls Api and send response to client
// Daily
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

// Take Stocks name from clinet, calls Api and send response to client
// IntraDay
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

// app.get('/getApiPriceToBook/:symbol', async (request, response) => {

//     const api_key = process.env.API_KEY_INTRI;    // Takes api key from .env file
//     const symbol = request.params.symbol;
//     const api_url = 'https://api-v2.intrinio.com/companies/' + symbol + '/historical_data/pricetobook?api_key=' + api_key + '';
//     const fetch_response = await fetch(api_url);
//     const json = await fetch_response.json();       // Wait to fetch json from api

//     console.log(request.params.symbol);
//     console.log(api_url);

//     response.json(json);    // Send response to client
//     exports.symbol = request.params.symbol;
// });

// Use port 1200 when run locally when run on heroku use their port
// const PORT = process.env.PORT || 1200;



// app.listen(PORT, console.log(`Server started on port ${PORT}`));
