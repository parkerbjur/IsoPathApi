const { Mongoose } = require("mongoose");

mongoose = require('./dbConnection');

const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    salt: String,
    rating: Number,
    games: [String],
});

const User = mongoose.model('User', UserSchema);

exports.User = User