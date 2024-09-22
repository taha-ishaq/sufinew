const productRepository = require('../Repositories/productRepository');
const cloudinary = require('../cloundinaryConfig');
const Product = require('../models/productModel');
const csv = require('csv-parser');
const { Readable } = require('stream'); // Importing Readable stream to convert buffer to stream 

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
  getProductsByTwoTags: async (req, res) => {
    try {
      const { tag1 = '', tag2 = '' } = req.query; // Default to empty string
      if (!tag1 || !tag2) {
        return res.status(400).json({ message: 'Both tags are required' });
      }
      const products = await productRepository.getProductsByTwoTags({ $or: [{ tags: tag1 }, { tags: tag2 }] });
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching products', error });
    }
  },
  
  
  getProductsByThreeTags: async (req, res) => {
    try {
      const { tag1, tag2 , tag3 } = req.query;
      if (!tag1 || !tag2 || !tag3) {
        return res.status(400).json({ message: 'Both tags are required' });
      }
      const products = await productRepository.getProductsByTags([tag1, tag2]);
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching products', error });
    }
  },
  // Woman-related products
  getWomanProducts: async (req, res) => {
    try {
      const products = await productRepository.getProductsByTags(['woman']);
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching woman products', error });
    }
  },

  getWomanAndStitchProducts: async (req, res) => {
    try {
      const products = await productRepository.getProductsByTags(['woman', 'stitch']);
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching woman and stitch products', error });
    }
  },

  getWomanAndUnstitchProducts: async (req, res) => {
    try {
      const products = await productRepository.getProductsByTags(['woman', 'unstitch']);
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching woman and unstitch products', error });
    }
  },

  // Man-related products
  getManProducts: async (req, res) => {
    try {
      const products = await productRepository.getProductsByTags(['man']);
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching man products', error });
    }
  },

  getManAndStitchProducts: async (req, res) => {
    try {
      const products = await productRepository.getProductsByTags(['man', 'stitch']);
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching man and stitch products', error });
    }
  },

  getManAndUnstitchProducts: async (req, res) => {
    try {
      const products = await productRepository.getProductsByTags(['man', 'unstitch']);
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching man and unstitch products', error });
    }
  },

  // Bridal-related products
  getBridalProducts: async (req, res) => {
    try {
      const products = await productRepository.getProductsByTags(['bridal']);
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching bridal products', error });
    }
  },

  getBridalAndPartyWearProducts: async (req, res) => {
    try {
      const products = await productRepository.getProductsByTags(['bridal', 'party wear']);
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching bridal and party wear products', error });
    }
  },

  getBridalAndManProducts: async (req, res) => {
    try {
      const products = await productRepository.getProductsByTags(['bridal', 'man']);
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching bridal and man products', error });
    }
  },
  getWomenProductsByThreeTags: async (req, res) => {
    try {
      const { tag1, tag2, tag3 } = req.query;
      if (!tag1 || !tag2 || !tag3) {
        return res.status(400).json({ message: 'All three tags are required' });
      }
      const products = await productRepository.getProductsByTags([tag1, tag2, tag3]);
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching products', error });
    }
  },
  
  // Get products by three tags for men
  getMenProductsByThreeTags: async (req, res) => {
    try {
      const { tag1, tag2, tag3 } = req.query;
      if (!tag1 || !tag2 || !tag3) {
        return res.status(400).json({ message: 'All three tags are required' });
      }
      const products = await productRepository.getProductsByTags([tag1, tag2, tag3]);
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching products', error });
    }
  },
  getManBridalPartywearProducts: async (req, res) => {
    try {
      const products = await productRepository.getProductsByTags(['man', 'bridal', 'partywear']);
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching bridal and man products', error });
    }
  },
  
  // Get woman products related to bridal and party wear
  getWomanBridalPartywearProducts: async (req, res) => {
    try {
      const products = await productRepository.getProductsByTags(['woman', 'bridal', 'partywear']);
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching bridal and woman products', error });
    }
  },
  getProductsByyTags: async (req, res) => {
    try {
      const { tags } = req.query; // Expecting a comma-separated string of tags
      if (!tags) {
        return res.status(400).json({ message: 'Tags are required' });
      }
  
      const tagsArray = tags.split(','); // Convert the string to an array
  
      const products = await Product.aggregate([
        {
          $match: {
            $or: [
              { tags: { $all: ['woman'] }, tags: { $nin: ['man'] } },
              { tags: { $all: ['man'] }, tags: { $nin: ['woman'] } },
              { tags: { $all: tagsArray } }
            ]
          }
        },
        {
          $group: {
            _id: null,
            totalProducts: { $sum: 1 },
            products: { $push: "$$ROOT" } // Push all matching products into an array
          }
        },
        {
          $project: {
            _id: 0,
            totalProducts: 1,
            products: 1
          }
        }
      ]);
  
      if (products.length === 0) {
        return res.status(404).json({ message: 'No products found with the specified tags' });
      }
  
      res.status(200).json(products[0]); // Return the aggregated result
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching products by tags', error });
    }
  },
 // Assuming your Mongoose Product model is here
  // Assuming this is your Product model
 
  bulkUploadProducts: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      const results = [];
      const bufferStream = new Readable();
      bufferStream.push(req.file.buffer);
      bufferStream.push(null);
  
      bufferStream
        .pipe(csv())
        .on('data', (data) => {
          console.log('Received data:', data);
          results.push(data);
        })
        .on('end', async () => {
          try {
            const savedProducts = [];
  
            for (const productData of results) {
              // Check required fields
              if (!productData.name || !productData.price || !productData.productCode || !productData.mainImage || !productData.fabric || !productData.description) {
                return res.status(400).json({ message: 'Missing required fields', data: productData });
              }
  
              const price = parseFloat(productData.price);
              if (isNaN(price)) {
                return res.status(400).json({ message: 'Invalid price value', data: productData });
              }
  
              const newProduct = new Product({
                name: productData.name,
                description: productData.description,
                price: price,
                mainImage: productData.mainImage,
                secondaryImages: productData.secondaryImages ? productData.secondaryImages.split(',') : [],
                tags: productData.tags ? productData.tags.split(',') : [],
                details: productData.details,
                color: productData.color,
                stock: parseInt(productData.stock, 10) || 0,
                fabric: productData.fabric,
                size: productData.size ? productData.size.split(',') : [],
                length: parseFloat(productData.length) || 0,
                productCode: productData.productCode,
              });
  
              const savedProduct = await newProduct.save();
              savedProducts.push(savedProduct);
            }
  
            res.status(201).json({ message: 'Products uploaded successfully', products: savedProducts });
          } catch (saveError) {
            console.error('Error saving products:', saveError);
            res.status(500).json({ message: 'Error saving products', error: saveError.message });
          }
        })
        .on('error', (error) => {
          console.error('Error reading CSV file:', error);
          res.status(500).json({ message: 'Error processing file', error: error.message });
        });
  
    } catch (error) {
      console.error('Error in bulkUploadProducts:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }

};

module.exports = productController;
