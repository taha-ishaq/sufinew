const adminRepository = require('../Repositories/adminRepository')
const Admin = require('../models/adminModel')
const bcrypt = require('bcryptjs')
const adminController = {
    // Admin registration
    // Admin registration
registerAdmin: async (req, res) => {
    try {
      const adminData = req.body;
      const newAdmin = await adminRepository.registerAdmin(adminData);
      res.status(201).json({ message: 'Admin registered successfully', admin: newAdmin });
    } catch (error) {
      console.error(error); // Log the error details
      if (error.message === 'Admin already exists') {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  },
  
    // Admin login
    loginAdmin: async (req, res) => {
      try {
        const { username, password } = req.body; // Change email to username
        const admin = await adminRepository.loginAdmin(username, password);
        res.status(200).json({ message: 'Login successful', admin });
      } catch (error) {
        res.status(401).json({ message: error.message }); // Unauthorized
      }
    },
  };
  
  module.exports = adminController;
  