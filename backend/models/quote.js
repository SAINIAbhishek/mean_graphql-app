const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  quote: {
    type: 'string',
    required: true
  },
  author: {
    type: 'string',
    required: true
  }
});

module.exports = mongoose.model('Quote', schema);