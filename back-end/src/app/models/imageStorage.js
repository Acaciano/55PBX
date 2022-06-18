
const mongoose = require('mongoose');

const ImageStorageSchema = new mongoose.Schema({
  baseUrl: {
    type: String,
  },
  url: {
    type: String,
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const ImageStorage = mongoose.model('ImageStorage', ImageStorageSchema);

module.exports = ImageStorage;