const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    tags: { type: [String], required: true, default: [] },
    mainImage: { type: String, required: true },
    secondaryImages: { type: [String], default: [] },
    sizes: { type: [String], enum: ['XS', 'S', 'M', 'L', 'XL'], default: [] },
    length: { type: Number, min: 0, default: null },
    fabric: { type: String, required: true, trim: true },
    colors: { type: [String], required: true, validate: [arrayLimit, 'Exceeds the limit of colors'] },
    details: { type: [String], required: true },
    description: { type: String, required: true, trim: true },
    stock: { type: Number, required: true, default: 0, min: 0 },
    featured: { type: Boolean, default: false },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviews: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String, trim: true },
      createdAt: { type: Date, default: Date.now }
    }],
    productCode: { type: String, required: true}, // Added productCode field
  },
  { timestamps: true }
);

// Custom validation function for color array limit
function arrayLimit(val) {
  return val.length <= 10; // Limit to 10 colors
}

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
