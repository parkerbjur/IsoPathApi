const { registerListener, registerStatupListener } = require('./server');

module.exports = () => {
  registerStatupListener(() => {
    console.log('startup listener');
  });
  registerListener({
    eventType: 'move',
    function: () => {
      console.log('move listener');
    },
  });
};
