const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  url: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true,
    enum: ['t_shirts', 'jackets'], // extend this if needed
    lowercase: true
  },

  price: {
    type: Number,
    required: true,
    min: 0
  },

  inStock: {
    type: Boolean,
    default: true
  },

  description: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model('Product', productSchema);

