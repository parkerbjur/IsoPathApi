const server = require('../interaction/server');
const { Board } = require('./board');

module.exports = {
  games: {},

  createGame(socket1, socket2) {
    const gameID = Date.now() + String(Math.floor(Math.random() * 100));
    socket1.join(gameID);
    socket2.join(gameID);
    this.games[gameID] = new Board(socket1, socket2, gameID);

    server.io.to(gameID).emit('game:create', {
      gameID,
      IBN: this.games[gameID].IBN,
    });
  },

  playMove: (args) => {
    const { gameID } = JSON.parse(args);
    this.games[gameID].playMove(JSON.parse(args));
  },
};
