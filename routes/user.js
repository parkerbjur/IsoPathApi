const userControl = require('../controller/user');
const router = require('./routes');

router.post('/api/signup', userControl.signup);

router.post('/api/login', userControl.login);

module.exports = router;
