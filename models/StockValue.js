
// Mongoose provides a straight-forward, 
// Schema-based solution to model your application data.
const mongoose = require('mongoose');

// StockValue model 
const StockValueSchema = new mongoose.Schema({

    id: {

        type: String,
        required: true
    },
    stockName: {

        type: String,
        required: true
    },

    date: {

        type: Date,
        default: Date.now
    },

    min: {

        type: String,
        required: true
    },

    max: {

        type: String,
        required: true
    },

});

// Exports UserSchema so we can use it 
// at server
const Stock = mongoose.model('Stock', StockValueSchema);

module.exports = Stock;
