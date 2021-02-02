const mongoose = require('./dbConnection');

const GameSchema = new mongoose.Schema({
  running: Boolean,
  rated: Boolean,
  state: String,
  moves: String,
  events: [
    {
      turn: {
        type: String,
        enum: ['BLACK', 'WHITE'],
        default: 'BLACK',
      },
      wClock: Number,
      bClock: Number,
      move: String,
    },
  ],
});

const Game = mongoose.model('Game', GameSchema);

exports.Game = Game;
