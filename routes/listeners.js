const { registerListener, registerStatupListener } = require('./server');

module.exports = () => {
  registerStatupListener(() => {
    console.log('listener registered and running');
  });
};
