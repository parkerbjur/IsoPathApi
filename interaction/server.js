require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser').json();
const http = require('http');

const server = http.createServer(app);
const Server = require('socket.io');

const io = new Server(server);
const gameRoutes = require('./game');

const port = process.env.PORT || 3000;

app.use(bodyParser);
app.use('/api/game', gameRoutes);
app.get('/', (req, res) => { res.json(req.body); });

io.on('connection', (socket) => {
  console.log(`a user connected at ${socket}`);
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
