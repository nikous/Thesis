<img align="left" width="100" height="100" src="https://i.imgur.com/AQkebBz.png">

# Nstocks Web application 

You can see a hosted version of Nstocks on [Heroku](https://nick-thesis.herokuapp.com)



## Table of contents
* [General info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Requirements](#Requirements)
* [Setup](#setup)
* [Compress](#compress)
* [Deploy to Heroku](#deploy-to-heroku)
* [Contact](#contact)

## General info


Nstocks is a web application for the Stock market. It receives the data for the stocks from the [Alpha Vantage](https://www.alphavantage.co)
and visualizes them with charts. Anyone who uses the web application has the capability to monitor current high, low, close, previous close and open. You can also register to the application and therefore, as a user you can follow your favorite stocks in order for them to be organized in your Profile. Another advantage of being a user at Nstocks is that you can set upper and lower bounds for a specific stock and if its value decreases or increases, the server will send you an notification email. The back-end is built with Nodejs, express and other packages from npm , while the frond-end is built with Bootstrap, EJS, CSS and Javascript. The server makes API calls and then sends the data to the client, which visualizes them with charts for the timeline of: 1 Day, 2 Days, 1 Month, 5 Months, 1 Year, 5 Years and Max years. Both of the server and the client communicate with AJAX. The web application is online with the usage of Heroku and Github.

## Screenshots


### Homepage


<img align="center"  src="https://i.imgur.com/NoReWqx.png">

### How it works

<img align="center"  src="https://i.imgur.com/3hjj33i.png">

### Stocks

In Stocks page you can search and track the stocks you are looking for
<img align="center"  src="https://i.imgur.com/e5Lty5s.png">

### Profile

If you register and login you can have access to Profile page, where user's favorite stocks appear and can also set upper and lower bounds for the stocks prices.
<img align="center"  src="https://i.imgur.com/p2Wo0im.png">

## Technologies


* [NodeJS](https://github.com/nodejs)
* [Express](https://github.com/expressjs/express)
* [MongoDB](https://github.com/mongodb/mongo)
* [Mongoose](https://github.com/Automattic/mongoose)
* [Socket.io](https://github.com/socketio/socket.io)
* [Passport](https://github.com/jaredhanson/passport)
* [Chartjs](https://github.com/chartjs)
* [Ejs](https://github.com/mde/ejs)
* [bcrypt.js](https://github.com/dcodeIO/bcrypt.js/blob/master/README.md)
* [nodemailer](https://github.com/nodemailer/nodemailer)
* [dotenv](https://github.com/motdotla/dotenv)



## Requirements


* Node 
* Git

## Setup

* Clone the repo and install the dependencies.

```bash
git clone https://github.com/nikous/Thesis.git
cd Thesis
```

```bash
npm install
```

* Next create an .env file to your main folder (Thesis) and add: 


```bash
API_KEY = < Add your api-key from Alphavantage >
PASS = < MongoDB password >
EMAIL = < Password for the email you use to send the notification emails >
```

* Then  change the link to mongoDB database:
go to config folder, change in  the keys.js file the link, next to dbPassword.

```bash
require('dotenv').config();

//Pasword to connect to mongodb is in the .env file
pass = process.env.PASS;

// Change the link 
dbPassword = 'mongodb+srv://jimmy:' + pass + '@database-keiop.mongodb.net/test?retryWrites=true&w=majority';

module.exports = {

    mongoURI: dbPassword

};
```
* Lastly, go to routes folder and change email in StockValue.js file.


```bash
       var transporter = nodemailer.createTransport({

                                service: 'gmail',
                                auth: {
                                    
                                    // Add your email next to user
                                    user: 'Nstocks@gmail.com',
                                    pass: Emailpass
                                }
                            });
```

* To start the express server, run the following:


```bash
npm run dev
```
* Open http://localhost:1200 and take a look around.

## Compress

You can compress your files with brotli and zlib using the following command:

```bash
node compress
```

## Deploy to Heroku

You can also deploy this app to Heroku:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Contact

If you want to contact with me you can reach me at the following email address: nickos.papaoik@gmail.com
