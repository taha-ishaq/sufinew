const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a new product
router.post('/', upload.fields([{ name: 'mainImage' }, { name: 'secondaryImages' }]), productController.createProduct);

// Get all products
router.get('/', productController.getAllProducts);

// Get products sorted by price (highest to lowest)
router.get('/sorted/price/desc', productController.getProductsSortedByPriceDesc);

// Get products sorted by price (lowest to highest)
router.get('/sorted/price/asc', productController.getProductsSortedByPriceAsc);

// Get products by tags
router.get('/tags', productController.getProductsByTags);

// Get product by ID
router.get('/:id', productController.getProductById);

// Update a product
router.put('/edit-product/:id', upload.fields([{ name: 'mainImage' }, { name: 'secondaryImages' }]), productController.updateProduct);

// Delete a product
router.delete('/:id', productController.deleteProduct);

router.get('/:code', productController.getProductsByCode);

module.exports = router;
