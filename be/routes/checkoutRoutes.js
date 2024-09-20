const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

router.post('/', checkoutController.createCheckout);
router.get('/:id', checkoutController.getCheckoutById);
router.get('/', checkoutController.getAllCheckouts);
router.delete('/:id', checkoutController.deleteCheckout);

module.exports = router;
