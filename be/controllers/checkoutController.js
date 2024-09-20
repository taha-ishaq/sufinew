const checkoutRepository = require('../Repositories/checkoutRepository');
const sendOrderNotification = require('../utils/Mailer'); // Adjust the path as needed

class CheckoutController {
  async createCheckout(req, res) {
    try {
      const checkoutData = req.body;
      const checkout = await checkoutRepository.createCheckout(checkoutData);

      // Send the email notification
      await sendOrderNotification(checkoutData);

      return res.status(201).json(checkout);
    } catch (error) {
      console.error('Error creating checkout:', error);
      return res.status(500).json({ message: 'Error creating checkout', error });
    }
  }

  async getCheckoutById(req, res) {
    const { id } = req.params;
    try {
      const checkout = await checkoutRepository.getCheckoutById(id);
      if (!checkout) {
        return res.status(404).json({ message: 'Checkout not found' });
      }
      return res.status(200).json(checkout);
    } catch (error) {
      console.error('Error fetching checkout:', error);
      return res.status(500).json({ message: 'Error fetching checkout', error });
    }
  }

  async getAllCheckouts(req, res) {
    try {
      const checkouts = await checkoutRepository.getAllCheckouts();
      return res.status(200).json(checkouts);
    } catch (error) {
      console.error('Error fetching checkouts:', error);
      return res.status(500).json({ message: 'Error fetching checkouts', error });
    }
  }

  async deleteCheckout(req, res) {
    const { id } = req.params;
    try {
      const checkout = await checkoutRepository.deleteCheckout(id);
      if (!checkout) {
        return res.status(404).json({ message: 'Checkout not found' });
      }
      return res.status(200).json({ message: 'Checkout deleted' });
    } catch (error) {
      console.error('Error deleting checkout:', error);
      return res.status(500).json({ message: 'Error deleting checkout', error });
    }
  }
}

module.exports = new CheckoutController();
