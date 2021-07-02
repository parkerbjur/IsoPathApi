const queue = require('../application/queue');

module.exports = (io, socket) => {
  socket.on('game:search', queue.enterQueue(socket));
};
