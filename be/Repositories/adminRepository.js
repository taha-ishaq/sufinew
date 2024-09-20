const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs')

const adminRepository = {
  // Register a new admin
  registerAdmin: async (adminData) => {
    const { username, password } = adminData;

    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      throw new Error('Admin already exists');
    }

    // Create a new admin object
    const newAdmin = new Admin({
      username,
      password // Password will be hashed automatically
    });

    // Save the new admin to the database
    return await newAdmin.save();
  },

  // Admin login
  loginAdmin: async (username, password) => {
    // Find the admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      throw new Error('Invalid username or password');
    }

    // Compare the entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }

    // Return the admin details (without the password)
    return admin;
  },

  // Find admin by ID
  findAdminById: async (id) => {
    return await Admin.findById(id);
  },
  
  // Add other admin-related database operations as needed
};

module.exports = adminRepository;
