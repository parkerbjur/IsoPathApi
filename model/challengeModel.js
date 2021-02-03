const mongoose = require('./dbConnection');

const challengeSchema = new mongoose.Schema({
  challenger: String,
  challengee: String,
  rated: Boolean,
  clockTime: Number,
  clockIncrement: Number,
  color: {
    type: String,
    enum: ['BLACK', 'WHITE', 'RANDOM'],
    default: 'RANDOM',
  },
});

const Challenge = mongoose.model('Challenge', challengeSchema);

exports.Challenge = Challenge;
