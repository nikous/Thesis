const mongoose = require('mongoose');

const UserStockSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
}, { collection: 'UserStocks' });

const Stocks = mongoose.model('Stocks', UserStockSchema);

module.exports = Stocks;