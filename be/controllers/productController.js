const productRepository = require('../Repositories/productRepository');
const cloudinary = require('../cloundinaryConfig');
const Product = require('../models/productModel');

const productController = {
  // Create a new product
  createProduct: async (req, res) => {
    try {
      const productData = req.body;

      if (!req.files.mainImage || req.files.mainImage.length === 0) {
        return res.status(400).json({ message: 'Main image is required' });
      }

      const mainImageFile = req.files.mainImage[0].buffer;
      const secondaryImageFiles = req.files.secondaryImages || [];

      const mainImageResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: 'products' }, (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }).end(mainImageFile);
      });

      const secondaryImages = await Promise.all(
        secondaryImageFiles.map(file => new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ folder: 'products' }, (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }).end(file.buffer);
        }))
      );

      const newProduct = new Product({
        ...productData,
        mainImage: mainImageResult,
        secondaryImages,
      });

      const savedProduct = await newProduct.save();
      res.status(201).json({ message: 'Product created successfully', product: savedProduct });
    } catch (error) {
      console.error('Error in createProduct:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  },

  // Get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await productRepository.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error(error); // Log error for debugging
      res.status(500).json({ message: 'Internal server error', error });
    }
  },

  // Get products sorted by price (highest to lowest)
  getProductsSortedByPriceDesc: async (req, res) => {
    try {
      const products = await productRepository.getProductsSortedByPriceDesc();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products sorted by price (high to low):', error);
      res.status(500).json({ message: 'Internal server error', error });
    }
  },

  // Get products sorted by price (lowest to highest)
  getProductsSortedByPriceAsc: async (req, res) => {
    try {
      const products = await productRepository.getProductsSortedByPriceAsc();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products sorted by price (low to high):', error);
      res.status(500).json({ message: 'Internal server error', error });
    }
  },

  // Get products by tags
  getProductsByTags: async (req, res) => {
    try {
      const { tag } = req.query; // Use query parameters
      if (!tag) {
        return res.status(400).json({ message: 'Tags are required' });
      }
      const filter = { tags: tag }; // Filter based on tag
      const products = await Product.find(filter);
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching products', error });
    }
  },


  // Get product by ID
  getProductById: async (req, res) => {
    try {
      const product = await productRepository.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      console.error(error); // Log error for debugging
      res.status(500).json({ message: 'Internal server error', error });
    }
  },

  // Update a product
  updateProduct: async (req, res) => {
    try {
      const updatedProduct = await productRepository.updateProduct(req.params.id, req.body, req.files.mainImage[0], req.files.secondaryImages);
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
      console.error(error); // Log error for debugging
      res.status(500).json({ message: 'Internal server error', error });
    }
  },

  // Delete a product
  deleteProduct: async (req, res) => {
    try {
      const deletedProduct = await productRepository.deleteProduct(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error(error); // Log error for debugging
      res.status(500).json({ message: 'Internal server error', error });
    }
  },
  getProductsByCode: async (req, res) => {
    try {
        const { code } = req.query; // Use query parameters
        if (!code) {
            return res.status(400).json({ message: 'Product code is required' });
        }
        const filter = { productCode: code }; // Filter based on productCode
        const products = await Product.find(filter);
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products', error });
    }
},
};

module.exports = productController;
