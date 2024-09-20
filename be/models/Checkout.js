const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  apartmentSuite: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    default: ''
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  sizes: {
    type: [String],
    default: []
  },
  lengths: {
    type: [String],
    default: []
  }
}, { timestamps: true });

const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;
