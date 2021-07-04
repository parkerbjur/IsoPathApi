const server = require('../interaction/server');
const { Board } = require('./board');

module.exports = {
  games: {},

  createGame: (socket1, socket2) => {
    const gameID = Date();
    socket1.join(gameID);
    socket2.join(gameID);
    this.games[gameID] = new Board(socket1, socket2, gameID);
    server.io.to(gameID).emit('game:create');
  },

  playMove: (args) => {
    const { gameID } = JSON.parse(args);
    this.games[gameID].playMove();
  },
};
