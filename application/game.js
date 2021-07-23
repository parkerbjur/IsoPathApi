const { Board } = require('./board');

module.exports = {
  games: {},

  createGame(socket1, socket2) {
    const gameID = Date.now() + String(Math.floor(Math.random() * 100));
    socket1.join(gameID);
    socket2.join(gameID);
    let player0;
    let player2;
    if (Math.round(Math.random()) === 1) {
      player0 = socket1;
      player2 = socket2;
    } else {
      player0 = socket2;
      player2 = socket1;
    }

    this.games[gameID] = new Board(player0, player2, gameID);

    player0.emit('game:create', {
      gameID,
      IBN: this.games[gameID].IBN,
      side: 0,
      playerID: player0.id,
    });

    player2.emit('game:create', {
      gameID,
      IBN: this.games[gameID].IBN,
      side: 2,
      playerID: player2.id,
    });
  },

  playMove(args) {
    const { gameID } = args;
    this.games[gameID].playMove(args);
  },
};
