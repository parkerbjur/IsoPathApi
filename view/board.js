/* eslint-disable */
const Hex = fabric.util.createClass(fabric.Polygon, {
  type: 'Hex',
  initialize(options) {
    options || (options = {});

    const points = [];
    points.push({ x: options.Xcenter + options.size * Math.cos(0.5), y: options.Ycenter + options.size * Math.sin(0.5) });
    for (let i = 1; i <= 6; i += 1) {
      points.push({ x: options.Xcenter + options.size * Math.cos((i + 0.5) * 2 * Math.PI / 6), y: options.Ycenter + options.size * Math.sin((i + 0.5) * 2 * Math.PI / 6) });
    }

    stone = new fabric.Circle({
      radius: 5,
      fill: 'white',
    });

    label = options.label;
    stoneLevel = options.stoneLevel;
    tileLevel = options.tileLevel;
    this.callSuper('initialize', points, options);
  },

  _render(ctx) {
    if (this.tileLevel === 0) { this.fill = 'rgb(90,90,90)'; }
    if (this.tileLevel === 1) { this.fill = 'rgb(50,50,50)'; }
    if (this.tileLevel === 2) { this.fill = 'rgb(30,30,30)'; }
    if (this.tileLevel === -1) { this.fill = 'rgba(0,0,0,0)'; }
    this.stroke = 'black';

    if (this.stoneLevel === 0) { stone.fill = 'rgb(30,30,30)'; }
    if (this.stoneLevel === 1) { stone.fill = 'rgba(0,0,0,0)'; }
    if (this.stoneLevel === 2) { stone.fill = 'rgb(90,90,90)'; }
    if (this.stoneLevel === -1) { stone.fill = 'rgba(0,0,0,0'; }

    this.callSuper('_render', ctx);

    stone._render(ctx);

    ctx.font = '10px Helvetica';
    ctx.fillStyle = '#FFF';
    ctx.fillText(this.label, -this.width / 2, 0);
  },
});

function updateBoard(IBN) {
  for (const place in IBN.places) {
    objs[place].set('tileLevel', IBN.places[place].tile);
    objs[place].set('stoneLevel', IBN.places[place].stone);
  }
  canvas.renderAll();
}

function submitMove(move) {
  if (gameID === undefined) { return; }
  if (move.stone.sink == undefined) { return; }
  state = 'tileSource';
  proposedMove = {tile: {source: undefined, sink: undefined}, stone: {source: undefined, sink: undefined}}
  document.getElementById('moveSubmit').style.color = 'black';
  socket.emit('game:playMove', { move, gameID });
}

let proposedMove = {
  tile: {},
  stone: {},
};
let state = 'tileSource';

function placeSelected(event) {
  const { target } = event;

  if (tileSourceIsValid(target) && state === 'tileSource') {
    proposedMove.tile.source = target.label;
    target.set('tileLevel', target.tileLevel - 1);
    state = 'tileSink';
  } else if (tileSinkIsValid(target) && state === 'tileSink') {
    proposedMove.tile.sink = target.label;
    target.set('tileLevel', target.tileLevel + 1);
    state = 'stoneSource';
  } else if (stoneSourceIsValid(target) && state === 'stoneSource') {
    proposedMove.stone.source = target.label;
    target.set('stoneLevel', 1);
    state = 'stoneSink';
  } else if (stoneSinkIsValid(target) && state === 'stoneSink') {
    proposedMove.stone.sink = target.label;
    target.set('stoneLevel', IBN.turn);
    state = 'waiting';
    document.getElementById('moveSubmit').style.color = 'green';
  }
}

function tileSourceIsValid(target) {
  if (target.tileLevel > 0 && target.stoneLevel === 1) {
    return true;
  }
  return false;
}

function tileSinkIsValid(target) {
  if (target.tileLevel < 2 && target.stoneLevel === 1) {
    return true;
  }
  return false;
}

function stoneSourceIsValid(target) {
  if (target.stoneLevel === IBN.turn) {
    return true;
  }
  return false;
}

function stoneSinkIsValid(target) {
  if (target.stoneLevel === 1 && target.tileLevel == IBN.turn && placesAreAdjacent(target.label, proposedMove.stone.source)) {
    return true;
  }
  return false;
}
function placesAreAdjacent(placeOne, placeTwo) {
  if (adjacencyList[placeOne].includes(placeTwo)) {
    return true;
  } return false;
}

const adjacencyList = {
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
};

let objs = [];
function drawBoard(options) {
  const { height, reversed } = options;
  
  const R = height / 11;
  const r = (Math.sqrt(3) / 2) * R;

  for (let i = 0; i < 7; i += 1) {
    for (let j = 0; j < 7 - Math.abs(3 - i); j += 1) {
      const x = r * (Math.abs(3 - i) + 2 * j + 1);
      const y = R * ((1.5 * (i + 1) - 0.5));

      const placeConversion = {
        0: 'A',
        1: 'B',
        2: 'C',
        3: 'D',
        4: 'E',
        5: 'F',
        6: 'G',
      };
      const label = (() => placeConversion[i] + (j + 1))();

      objs[label] = new Hex({
        Xcenter: x,
        Ycenter: y,
        size: R,
        perPixelTargetFind: true,
        hasControls: false,
        hasBorders: false,
        lockMovementX: true,
        lockMovementY: true,
        label,
        stoneLevel: -1,
        tileLevel: -1,
        objectCaching: false,
      });

      objs[label].on('selected', (event) => {
        placeSelected(event);
      });

      canvas.add(objs[label]);
    }
  }
}

function reverseBoard () {
  const keys = Object.keys(objs);
  keys.sort();
  let locations = {};

  for(let i = 0; i < keys.length; i++){
    locations[keys[i]] = {};
    locations[keys[i]].top = objs[keys[i]].top
    locations[keys[i]].left = objs[keys[i]].left
  }
  for(let i = 0; i < keys.length; i++){
    objs[keys[i]].set('top', locations[keys[keys.length - i - 1]].top);
    objs[keys[i]].set('left', locations[keys[keys.length - i - 1]].left);
    console.log(objs[keys[i]]);
    objs[keys[i]].setCoords();
  }
  canvas.renderAll();
}

function clearMove () {
  if(proposedMove.tile.source != undefined){
    objs[proposedMove.tile.source].tileLevel += 1;
    proposedMove.tile.source = undefined
  }
  if(proposedMove.tile.sink != undefined){
    objs[proposedMove.tile.sink].tileLevel -= 1;
    proposedMove.tile.sink = undefined
  }
  if(proposedMove.stone.source != undefined){
    objs[proposedMove.stone.source].stoneLevel = IBN.turn;
    proposedMove.stone.source = undefined
  }
  if(proposedMove.stone.sink != undefined){
    objs[proposedMove.stone.sink].stoneLevel = 1;
    proposedMove.stone.sink = undefined
  }
  document.getElementById('moveSubmit').style.color = 'black';
  state = 'tileSource';
  canvas.renderAll();
}

let canvas;
function initializeCanvas() {
  canvas = new fabric.Canvas('canvas');

  drawBoard({ height: canvas.getHeight() , reversed: true});
}

const socket = io();
let gameID;
let IBN;

function joinGame() {
  document.getElementById('gameSearch').remove();
  socket.emit('game:search');
}

socket.on('game:create', (data) => {
  ({ gameID, IBN } = data);
  console.log(data);
  updateBoard(IBN);
  document.getElementById('reverseButton').style.display = 'block';
  document.getElementById('moves').style.display = 'block';
  document.getElementById('clearMove').style.display = 'block';
});

socket.on('move:confirm', (newIBN) => {
  IBN = newIBN;
  console.log(newIBN, objs);
  updateBoard(newIBN);
});
