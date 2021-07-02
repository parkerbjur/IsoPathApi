module.exports = {
  createGame: (socket1, socket2) => {
    const gameID = Date();
    socket1.join(gameID);
    socket2.join(gameID);
  },
};
