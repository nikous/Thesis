
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
        required: true
    },

    notification: {

        type: Array,
        required: false
    }
});

// Exports UserSchema so we can use it 
// at server
const User = mongoose.model('User', UserSchema);

module.exports = User;
