const express = require('express');
require('dotenv').config();

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

app.listen(port);

module.exports = router;
