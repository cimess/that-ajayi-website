const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  description: {
    type: String,
  },
  tags: [{
    type: String,
  }],
  affiliateLink: {
    type: String,
  },
  spinPath: {
    type: String,
  },
  spinFrames: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Collection', collectionSchema);
