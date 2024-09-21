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

router.get('/tags', (req, res) => productController.getProductsByTags(req, res, ['woman']));

// For products tagged with 'woman' and 'stitch'
router.get('/tags?tag=woman,stitch', (req, res) => productController.getProductsByTags(req, res, ['woman', 'stitch']));


router.get('/tags?tag=woman,unstitch', (req, res) => productController.getProductsByTags(req, res, ['woman', 'unstitch']));

// For all products tagged with 'man'
router.get('/tags?tag=man', (req, res) => productController.getProductsByTags(req, res, ['man']));

// For products tagged with 'man' and 'stitch'
router.get('/tags?tag=man,stitch', (req, res) => productController.getProductsByTags(req, res, ['man', 'stitch']));

// For products tagged with 'man' and 'unstitch'
router.get('/tags?tag=man,unstitch', (req, res) => productController.getProductsByTags(req, res, ['man', 'unstitch']));

// For all products tagged with 'bridal'
router.get('/tags/bridal', (req, res) => productController.getProductsByTags(req, res, ['bridal']));

// For products tagged with 'bridal' and 'party wear'
router.get('/tags?tag=bridal,partywear', (req, res) => productController.getProductsByTags(req, res, ['bridal', 'party wear']));

// For products tagged with 'bridal' and 'man'
router.get('/tags?tag=bridal,man', (req, res) => productController.getProductsByTags(req, res, ['bridal', 'man']));

// Get product by ID
router.get('/:id', productController.getProductById);

// Update a product
router.put('/edit-product/:id', upload.fields([{ name: 'mainImage' }, { name: 'secondaryImages' }]), productController.updateProduct);

// Delete a product
router.delete('/:id', productController.deleteProduct);

// Get products by product code
router.get('/code/:code', productController.getProductsByCode);

router.get('/tags', productController.getProductsByThreeTags);
router.get('/products/women/three-tags', productController.getWomenProductsByThreeTags);

// Routes for Men Products
router.get('/products/men/three-tags', productController.getMenProductsByThreeTags);
// Route for man bridal and party wear products
router.get('/products/man/bridal-partywear', productController.getManBridalPartywearProducts);

// Route for woman bridal and party wear products
router.get('/products/woman/bridal-partywear', productController.getWomanBridalPartywearProducts);
router.post('/bulk-upload', upload.single('file'), productController.bulkUploadProducts);
module.exports = router;
