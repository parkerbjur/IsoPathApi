const tf = require('@tensorflow/tfjs');
// const { Board } = require('./board');

class AiModel {
  static predictBestMove(boards) {
    for (let i = 0; i < boards.length; i += 1) {
      AiModel.IBNtoTensor(boards[i]);
    }
  }

  static createPopulation(data) {
    const { size } = data;
    const population = [];
    for (let i = 0; i < size; i += 1) {
      const model = tf.sequential();
      model.add(tf.layers.dense({
        units: 10,
        activation: 'relu',
        inputShape: [74],
        batchInputShape: [null, 74],
      }));
      model.add(tf.layers.dense({ units: 1 }));
      population.push(model);
    }
    return population;
  }

  static breed() {

  }

  static mutate() {

  }

  static evolve() {

  }

  static grade() {

  }

  static bestPosition(model, positions) {
    let bestPosition;
    for (let i = 0; i < positions.length; i += 1) {
      const score = model.predict(AiModel.IBNtoTensor(positions[i])).arraySync()[0][0];
      if (score > bestPosition.score) {
        bestPosition.position = positions[i];
        bestPosition.score = score;
      }
    }
    return bestPosition.position;
  }

  static evaluate(model, IBN) {
    return model.predict(AiModel.IBNtoTensor(IBN));
  }

  static IBNtoTensor(IBN) {
    let arr = [];
    const places = Object.entries(IBN.places);
    for (let i = 0; i < places.length; i += 1) {
      arr.push(places[i][1].tile);
      arr.push(places[i][1].stone);
    }
    arr = arr.map((x) => x - 1);
    const tensor = tf.tensor(arr, [1, 74]);
    return tensor;
  }
}

const population = AiModel.createPopulation({ size: 10 });
/* eslint-disable */

const IBN = {
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

for(let i = 0; i < population.length; i += 1) {
  console.log(population[i].predict(AiModel.IBNtoTensor(IBN)).arraySync()[0][0]);
}

exports.AiModel = AiModel;
