const userControl = require('../controller/user');
const router = require('./routes');

router.post('/api/signup', userControl.signup);

module.exports = router;
