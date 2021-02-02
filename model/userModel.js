const mongoose = require('./dbConnection');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  rating: Number,
  games: [String],
});

const User = mongoose.model('User', UserSchema);

exports.User = User;
