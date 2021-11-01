const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    username: String,
    password: {
        type: String,
        required: true,
    }
});

const UserModel = mongoose.model('User', User); 

module.exports = UserModel;
