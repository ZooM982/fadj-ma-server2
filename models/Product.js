const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  groupename: { type: String, required: true },
  imageUrl: { type: String } 
});

module.exports = mongoose.model('Product', productSchema);
