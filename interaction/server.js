require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser').json();
const http = require('http');

const server = http.createServer(app);
const Server = require('socket.io');

const io = new Server(server);

const port = process.env.PORT || 3000;

app.use(bodyParser);
app.get('/', (req, res) => { res.json(req.body); });

io.on('connection', (socket) => {
  console.log(`a user connected at ${socket}`);

  

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
