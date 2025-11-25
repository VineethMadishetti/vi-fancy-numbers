const mongoose = require('mongoose');

const numberSchema = mongoose.Schema({
  number: {
    type: String,
    required: [true, 'Please add a number'],
    unique: true,
    trim: true,
  },
  operator: {
    type: String,
    default: 'Vi', // Fixed as per requirement
    enum: ['Vi'],  // Restricts to only Vi
  },
  isSold: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

const Number = mongoose.model('Number', numberSchema);
module.exports = Number;