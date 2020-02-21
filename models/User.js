
// Mongoose provides a straight-forward, 
// Schema-based solution to model your application data.
const mongoose = require('mongoose');

// User model 
const UserSchema = new mongoose.Schema({

    name: {

        type: String,
        required: true
    },
    email: {

        type: String,
        required: true
    },
    password: {

        type: String,
        required: true
    },
    date: {

        type: Date,
        default: Date.now
    },

    stock: {

        type: Array,
        required: false
    },

    notification: {

        type: Array,
        required: true
    },
    dot: {

        type: Number,
        required: true
    },
});

// Exports UserSchema so we can use it 
// at server
const User = mongoose.model('User', UserSchema);

module.exports = User;
