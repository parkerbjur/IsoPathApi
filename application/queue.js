const game = require('./game');

module.exports = {
  queue: [],

  enterQueue: (socket) => {
    this.queue.unshift(socket);
    if (this.queue.length > 1) {
      game.createGame(this.queue.pop(), this.queue.pop());
    }
  },
};
