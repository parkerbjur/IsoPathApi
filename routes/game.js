const router = require('express').Router();
const { challenge } = require('../controller/game');
const { authorize } = require('../controller/user');

router.post('/challenge', authorize, challenge);

module.exports = router;
