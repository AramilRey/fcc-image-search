const mongoose = require('mongoose');

const Query = new mongoose.Schema({
  term: {
    type: String,
    required: true,
  },
  when: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('query', Query);
