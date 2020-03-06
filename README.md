<img align="left" width="100" height="100" src="https://i.imgur.com/AQkebBz.png">

# Nstocks Web application 

You can see a hosted version of Nstocks on [Heroku](https://nick-thesis.herokuapp.com)



## Table of contents
* [General info](#general-info)
* [Screenshots](#screenshots)
* [Requirements](#Requirements)
* [Setup](#setup)
* [Compress](#compress)
* [Deploy to Heroku](#deploy-to-heroku)
* [Contact](#contact)

## General info
Nstocks is a web application for the Stock market.It gets data for the stocks from Alpha Vantage
and visualize them with charts.You can also monitor current high,low,close,previous close and open.
You can register and follow your favorite stocks to have them organized in your userpage.
Lastly, you can set upper lower bounds and if value of stock gets bigger or lower that these, 
server will send you an email to notify you. The back-end is built with nodejs,express and other packages from npm 
and the frond-end is built with bootstrap,ejs,css and javascript. The server makes Api calls and sends data to client which
puts them to arrays and visualize them with charts for 1 Day,2 Days, 1 Month, 5 Months, 1 Year, 5 Years and Max years. 
Client and server communicate with Ajax.The web app is online using heroku and github.

## Screenshots
### Homepage
<img align="center"  src="https://i.imgur.com/NoReWqx.png">

### How it works

<img align="center"  src="https://i.imgur.com/3hjj33i.png">

### Stocks

In Stocks page you can search and track the stocks you are looking for 
<img align="center"  src="https://i.imgur.com/e5Lty5s.png">

### Profile

If you register and login you can have access to Profile page where users can have their favorite stocks and also users can set upper and lower bounds for the stocks prices
<img align="center"  src="https://i.imgur.com/p2Wo0im.png">

## Requirements


* Node 8
* Git

## Setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/nikous/Thesis.git
cd Thesis
```

```bash
npm install
```

Next you have to create an .env file to your main folder (Thesis) and add  


```bash
API_KEY = <Add your api-key from Alphavantage>
PASS = < MongoDB password >
EMAIL = < Password for the email you use to send the notification emails>
```

Then you have to change the link to mongoDB database.
Go to config folder add change in keys.js file the link next to dbPassword.

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
Lastly, go to routes folder and change email in StockValue.js file.


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

To start the express server, run the following


```bash
npm run dev
```
Open http://localhost:1200 and take a look around.

## Compress

You can compress your files with brotli and zlib using the following command 

```bash
node compress
```

## Deploy to Heroku

You can also deploy this app to Heroku:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Contact

If you want to contact me you can reach me at nickos.papaoik@gmail.com
