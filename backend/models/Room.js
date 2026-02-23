const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    default: 'Standard'
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  guests: {
    type: Number,
    default: 2
  },
  size: {
    type: Number,
    default: 300
  },
  amenities: {
    type: [String],
    default: []
  },
  imagePath: {
    type: String,
    required: true
  },
  isBooked: {
    type: Boolean,
    default: false
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel'
  }
});

module.exports = mongoose.model('Room', roomSchema);
