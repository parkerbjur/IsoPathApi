require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser').json();
const http = require('http');
const path = require('path');

const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);
exports.io = io;

const port = process.env.PORT || 3000;

app.use(express.static('view'));
app.use(bodyParser);
app.get('/', (req, res) => { res.json(req.body); });
app.get('/board', (req, res) => { res.sendFile(path.join(__dirname, '../view/board.html')); });

const handlers = require('./handlers');

io.on('connection', (socket) => {
  console.log(`a user connected at ${socket}`);

  handlers(io, socket);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
