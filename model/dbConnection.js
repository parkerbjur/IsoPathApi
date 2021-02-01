const mongoose = require('mongoose');

try {
  mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true });
} catch (error) {
  console.error(error);
}

exports.mongoose = mongoose;
