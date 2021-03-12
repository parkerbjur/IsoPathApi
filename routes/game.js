const router = require('express').Router();
const { challenge, getChallenges } = require('../controller/game');
const { authorize } = require('../controller/user');

router.post('/challenge', authorize, challenge);

router.get('/challenge', authorize, getChallenges);

module.exports = router;
