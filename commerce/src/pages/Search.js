// src/components/SearchPage.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [productCode, setProductCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/v2/products/${productCode}`);
      setError('');
      // Redirect to the product details page
      navigate(`/product-detail/${response.data._id}`);
    } catch (err) {
      setError('Product not found');
    }
  };

  return (
    <Box sx={{ marginTop: '90px', display: 'flex', alignItems: 'center' }}>
      <TextField
        label="Enter Product Code"
        variant="outlined"
        value={productCode}
        onChange={(e) => setProductCode(e.target.value)}
        sx={{ marginRight: '10px' }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
      {error && <Typography color="error" sx={{ marginLeft: '20px' }}>{error}</Typography>}
    </Box>
  );
};

export default Search;
