const game = require('./game');

const queue = {
  queue: [],

  enterQueue: (socket) => {
    this.queue.queue.unshift(socket);
    if (this.queue.length > 1) {
      game.createGame(this.queue.pop(), this.queue.pop());
    }
  },
};

exports.queue = queue;
