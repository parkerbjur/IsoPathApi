const mongoose = require('mongoose');

try {
  mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
} catch (error) {
  console.error(error);
}

module.exports = mongoose;
