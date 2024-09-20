const Checkout = require('../models/Checkout');

class CheckoutRepository {
  async createCheckout(data) {
    const checkout = new Checkout(data);
    return await checkout.save();
  }

  async getCheckoutById(id) {
    return await Checkout.findById(id).populate('products.productId');
  }

  async getAllCheckouts() {
    return await Checkout.find().populate('products.productId');
  }

  async deleteCheckout(id) {
    return await Checkout.findByIdAndDelete(id);
  }
}

module.exports = new CheckoutRepository();
