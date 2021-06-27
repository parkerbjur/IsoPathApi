require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser').json();
const WebSocket = require('ws');
const gameRoutes = require('./game');

const port = process.env.PORT || 3000;

app.use(bodyParser);
app.use('/api/game', gameRoutes);
app.get('/', (req, res) => { res.json(req.body); });

const wsServer = new WebSocket.Server({ noServer: true });

wsServer.startup = [];
wsServer.functions = {};
wsServer.on('connection', (socket) => {
  wsServer.startup.forEach((action) => {
    action();
  });

  socket.on('message', (data) => {
    wsServer.functions[JSON.parse(data).eventType](data);
  });
});

wsServer.registerStatupListener = (data) => {
  wsServer.startup.push(data);
};
wsServer.registerListener = (data) => {
  wsServer.functions[data.eventType] = data.function;
};

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (ws) => {
    wsServer.emit('connection', ws, request);
  });
});

exports.registerListener = wsServer.registerListener;
exports.registerStatupListener = wsServer.registerStatupListener;
require('./listeners')();
