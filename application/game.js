const GameModel = require('../data/gameModel');

exports.createGame = (game) => {
  const newGame = new GameModel({ game });
  newGame.save();
};
