require('dotenv');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use('/game', require('./game'));
app.use('/user', require('./user'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
