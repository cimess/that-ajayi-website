const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  brandName: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  mediaUrl: {
    type: String
  },
  mediaType: {
    type: String, // 'image' or 'video'
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  dateSubmitted: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Submission', submissionSchema);
