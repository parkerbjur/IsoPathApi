const express = require('express');
const user = require('../controller/controller');

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

app.listen(port);

router.post('/api/game/seek', (req, res) => {

});

router.post('/api/game/move', (req, res) => {

});

app.post('/api/challenge/', (req, res) => {

});

module.exports = router;
