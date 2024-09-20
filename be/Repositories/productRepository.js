const Product = require('../models/productModel');
const cloudinary = require('../cloundinaryConfig');

const productRepository = {
  // Create a new product
  createProduct: async (productData, mainImageFile, secondaryImageFiles) => {
    const mainImageResult = await cloudinary.uploader.upload(mainImageFile.path);
    
    const secondaryImageUploads = await Promise.all(
      secondaryImageFiles.map(file => cloudinary.uploader.upload(file.path))
    );
    const secondaryImages = secondaryImageUploads.map(result => result.secure_url);

    const newProduct = new Product({
      ...productData,
      mainImage: mainImageResult.secure_url,
      secondaryImages,
    });

    return await newProduct.save();
  },

  // Get all products with aggregation for optimization
  getAllProducts: async () => {
    return await Product.aggregate([
      {
        $project: {
          name: 1,
          price: 1,
          tags: 1,
          productCode: 1, // Include productCode in the projection
          mainImage: 1,
          secondaryImages: { $slice: ['$secondaryImages', 2] }, // Limit to 2 secondary images
          fabric: 1,
          color: 1,
          details: 1,
          description: 1,
          stock: 1,
          createdAt: 1,
        },
      },
    ]);
  },

  // Get product by ID
  getProductById: async (id) => {
    return await Product.findById(id);
  },

  // Get product by code
  getProductByCode: async (code) => {
    return await Product.findOne({ productCode: code });
  },

  // Update a product
  updateProduct: async (id, productData, mainImageFile, secondaryImageFiles) => {
    let updateData = { ...productData };

    if (mainImageFile) {
      const mainImageResult = await cloudinary.uploader.upload(mainImageFile.path);
      updateData.mainImage = mainImageResult.secure_url;
    }

    if (secondaryImageFiles && secondaryImageFiles.length > 0) {
      const secondaryImageUploads = await Promise.all(
        secondaryImageFiles.map(file => cloudinary.uploader.upload(file.path))
      );
      updateData.secondaryImages = secondaryImageUploads.map(result => result.secure_url);
    }

    return await Product.findByIdAndUpdate(id, updateData, { new: true });
  },

  // Delete a product
  deleteProduct: async (id) => {
    return await Product.findByIdAndDelete(id);
  },

  // Get products by tags
  getProductsByTags: async (tags) => {
    return await Product.find({ tags: { $in: tags } });
  },

  // Get products sorted by price (highest to lowest)
  getProductsSortedByPriceDesc: async () => {
    return await Product.find().sort({ price: -1 });
  },

  // Get products sorted by price (lowest to highest)
  getProductsSortedByPriceAsc: async () => {
    return await Product.find().sort({ price: 1 });
  },
};

module.exports = productRepository;
