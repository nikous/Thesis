require('dotenv').config();

pass = process.env.PASS;

dbPassword = 'mongodb+srv://nickous:' + pass + '@database-keiop.mongodb.net/test?retryWrites=true&w=majority';

module.exports = {
    mongoURI: dbPassword
};