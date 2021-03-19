require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const { JsonWebTokenError } = require('jsonwebtoken');
const WebSocket = require('ws');
const gameRoutes = require('./game');
const userRoutes = require('./user');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/game', gameRoutes);
app.use('/api/user', userRoutes);
app.get('/', (req, res) => { res.json(req.body); });

const wsServer = new WebSocket.Server({ noServer: true });

wsServer.on('connection', (socket) => {
  socket.on('message', (data) => {
    wsServer.functions[JSON.parse(data.eventType)](data);
  });
});
exports.wsServer.regesterListener = (data) => {
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
