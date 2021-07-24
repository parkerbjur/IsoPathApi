const { io } = require('../interaction/server');
const { Board } = require('./board.js');

class AiBoard extends Board {
  constructor(player, gameID) {
    super(player, '', gameID);
    this.humanPlayer = player;
  }

  playMove(data) {
    const { move } = data;
    if (Board.moveIsValid(this.IBN, move)) {
      this.IBN = Board.playMove(this.IBN, move);
      io.to(this.humanPlayer.id).emit('move:confirm', this.IBN);

      this.IBN = AiBoard.aiMove(this.IBN);
      io.to(this.humanPlayer.id).emit('move:confirm', this.IBN);
    } else {
      io.to(this.humanPlayer.id).emit('move:reject', this.IBN);
    }
  }

  static aiMove(IBN) {
    const moves = Board.allPossibleMoves(IBN);
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    return Board.playMove(IBN, randomMove);
  }
}

exports.AiBoard = AiBoard;
