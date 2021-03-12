const mongoose = require('./dbConnection');

/**
 * @class {} challengeSchma
 * @param {String} challenger
 * @param {String} challengee
 * @param {Boolean} rated
 * @param {Number} clockTime
 * @param {Number} clockIncrement
 * @param {String} color ['BLACK', 'WHITE', 'RANDOM']
 */
const ChallengeSchema = new mongoose.Schema({
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

const Challenge = mongoose.model('Challenge', ChallengeSchema);

exports.Challenge = Challenge;
