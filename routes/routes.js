require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const gameRoutes = require('./game');
const userRoutes = require('./user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/game', gameRoutes);
app.use('/api/user', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
