const gameControl = require('../controller/game');
const auth = require('../controller/game');
const router = require('./routes');

router.post('/api/challenge/', auth.authorize, gameControl.challenge);
