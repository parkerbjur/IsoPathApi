const mongoose = require('mongoose');

try {
  mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
} catch (error) {
  console.error(error);
}

module.exports = mongoose;
