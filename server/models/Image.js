const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const imageSchema = new Schema({
  originalName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  }
});

const Image = model('Image', imageSchema);

module.exports = Image;
