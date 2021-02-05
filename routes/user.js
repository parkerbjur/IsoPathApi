const router = require('express').Router();
const { signup, login } = require('../controller/user');

router.post('/api/signup', signup);

router.post('/api/login', login);

module.exports = router;
