const game = require('../application/game');
const { queue } = require('../application/queue');

module.exports = (io, socket) => {
  socket.on('game:search', () => { queue.enterQueue(socket); });
  socket.on('game:playMove', (args) => { game.playMove(args); });
};
