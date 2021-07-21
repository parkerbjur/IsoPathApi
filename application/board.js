const { io } = require('../interaction/server');

class Board {
  constructor(socket1, socket2, gameID) {
    this.gameID = gameID;

    if (Math.round(Math.random()) === 1) {
      this.player1 = socket1;
      this.player2 = socket2;
    } else {
      this.player1 = socket2;
      this.player2 = socket1;
    }
  }

  IBN = {
    plys: 0,
    turn: 0,
    places: {
      A1: { tile: 0, stone: 0 },
      A2: { tile: 0, stone: 0 },
      A3: { tile: 0, stone: 0 },
      A4: { tile: 0, stone: 0 },
      B1: { tile: 1, stone: 1 },
      B2: { tile: 1, stone: 1 },
      B3: { tile: 1, stone: 1 },
      B4: { tile: 1, stone: 1 },
      B5: { tile: 1, stone: 1 },
      C1: { tile: 1, stone: 1 },
      C2: { tile: 1, stone: 1 },
      C3: { tile: 1, stone: 1 },
      C4: { tile: 1, stone: 1 },
      C5: { tile: 1, stone: 1 },
      C6: { tile: 1, stone: 1 },
      D1: { tile: 1, stone: 1 },
      D2: { tile: 1, stone: 1 },
      D3: { tile: 1, stone: 1 },
      D4: { tile: 1, stone: 1 },
      D5: { tile: 1, stone: 1 },
      D6: { tile: 1, stone: 1 },
      D7: { tile: 1, stone: 1 },
      E1: { tile: 1, stone: 1 },
      E2: { tile: 1, stone: 1 },
      E3: { tile: 1, stone: 1 },
      E4: { tile: 1, stone: 1 },
      E5: { tile: 1, stone: 1 },
      E6: { tile: 1, stone: 1 },
      F1: { tile: 1, stone: 1 },
      F2: { tile: 1, stone: 1 },
      F3: { tile: 1, stone: 1 },
      F4: { tile: 1, stone: 1 },
      F5: { tile: 1, stone: 1 },
      G1: { tile: 2, stone: 2 },
      G2: { tile: 2, stone: 2 },
      G3: { tile: 2, stone: 2 },
      G4: { tile: 2, stone: 2 },
    },
  }

  playMove(data) {
    const { move } = data;

    if (!this.moveIsValid(this.IBN, move)) {
      io.to(this.gameID).emit('move:reject', this.IBN);
      return;
    }

    // remove tile from tile source
    this.IBN.places[move.tile.source].tile += -1;
    // add tile to tile sink
    this.IBN.places[move.tile.sink].tile += 1;

    // remove stone from stone source
    this.IBN.places[move.stone.source].stone = 1;
    // add stone to stone sink
    this.IBN.places[move.stone.sink].stone = this.IBN.turn;

    // change turn
    this.IBN.turn = (this.IBN.turn === 0) ? 2 : 0;

    // increase ply by one
    this.IBN.ply += 1;
    io.to(this.gameID).emit('move:confirm', this.IBN);
  }

  moveIsValid(IBN, move) {
    // check if tile source has a tile to move and no stone on it
    if (this.IBN.places[move.tile.source].tile === 0) {
      return false;
    }
    if (this.IBN.places[move.tile.source].stone !== 1) {
      return false;
    }

    // check if tile sink can accept a tile and has no stone on it
    if (this.IBN.places[move.tile.sink].tile === 2) {
      return false;
    }
    if (this.IBN.places[move.tile.sink].stone !== 1) {
      return false;
    }

    const tempIBN = JSON.parse(JSON.stringify(IBN));
    tempIBN.places[move.tile.source].tile += -1;
    tempIBN.places[move.tile.sink].tile += 1;

    // check if stone source has a valid stone on it
    if (this.IBN.places[move.stone.source].stone !== IBN.turn) {
      return false;
    }

    // check if stone sink is adjacent so source
    if (!Board.placesAreAdjacent(move.stone.source, move.stone.sink)) {
      return false;
    }
    // check if stone sink is appropriate level
    if (this.IBN.turn !== tempIBN.places[move.stone.sink].tile) {
      return false;
    }
    // ckeck if stone sink can accept a stone
    if (this.IBN.places[move.stone.sink].stone !== 1) {
      return false;
    }
    return true;
  }

  static placesAreAdjacent(placeOne, placeTwo) {
    if (Board.adjacencyList[placeOne].includes(placeTwo)) {
      return true;
    } return false;
  }

  static adjacencyList = {
    A1: ['A2', 'A4', 'B1', 'B2'],
    A2: ['A1', 'A3', 'B2', 'B3'],
    A3: ['A2', 'A4', 'B3', 'B4'],
    A4: ['A1', 'A3', 'B4', 'B5'],
    B1: ['A1', 'B2', 'C1', 'C2'],
    B2: ['A1', 'A2', 'B1', 'B3', 'C2', 'C3'],
    B3: ['A2', 'A3', 'B2', 'B4', 'C3', 'C4'],
    B4: ['A3', 'A4', 'B3', 'B5', 'C4', 'C5'],
    B5: ['A4', 'B4', 'C5', 'C6'],
    C1: ['B1', 'C2', 'D1', 'D2'],
    C2: ['B1', 'B2', 'C1', 'C3', 'D2', 'D3'],
    C3: ['B2', 'B3', 'C2', 'C4', 'D3', 'D4'],
    C4: ['B3', 'B4', 'C3', 'C5', 'D4', 'D5'],
    C5: ['B4', 'B5', 'C4', 'C6', 'D5', 'D6'],
    C6: ['B5', 'C5', 'D6', 'D7'],
    D1: ['C1', 'D2', 'D7', 'E1'],
    D2: ['C1', 'C2', 'D1', 'D3', 'E1', 'E2'],
    D3: ['C2', 'C3', 'D2', 'D4', 'E2', 'E3'],
    D4: ['C3', 'C4', 'D3', 'D5', 'E3', 'E4'],
    D5: ['C4', 'C5', 'D4', 'D6', 'E4', 'E5'],
    D6: ['C5', 'C6', 'D5', 'D7', 'E5', 'E6'],
    D7: ['C6', 'D1', 'D6', 'E6'],
    E1: ['D1', 'D2', 'E2', 'F1'],
    E2: ['D2', 'D3', 'E1', 'E3', 'F1', 'F2'],
    E3: ['D3', 'D4', 'E2', 'E4', 'F2', 'F3'],
    E4: ['D4', 'D5', 'E3', 'E5', 'F3', 'F4'],
    E5: ['D5', 'D6', 'E4', 'E6', 'F4', 'F5'],
    E6: ['D6', 'D7', 'E5', 'F5'],
    F1: ['E1', 'E2', 'F2', 'G1'],
    F2: ['E2', 'E3', 'F1', 'F3', 'G1', 'G2'],
    F3: ['E3', 'E4', 'F2', 'F4', 'G2', 'G3'],
    F4: ['E4', 'E5', 'F3', 'F5', 'G3', 'G4'],
    F5: ['E5', 'E6', 'F4', 'G4'],
    G1: ['F1', 'F2', 'G2', 'G4'],
    G2: ['F2', 'F3', 'G1', 'G3'],
    G3: ['F3', 'F4', 'G2', 'G4'],
    G4: ['F4', 'F5', 'G1', 'G3'],
  }
}

exports.Board = Board;
