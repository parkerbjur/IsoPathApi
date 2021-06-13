const GameModel = require('../model/gameModel');

exports.createGame = (game) => {
  const newGame = new GameModel({ game });
  newGame.save();
};
