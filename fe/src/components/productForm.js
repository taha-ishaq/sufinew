import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';

const ProductForm = () => {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    tags: '',
    mainImage: null,
    secondaryImages: [],
    size: '',
    length: '',
    fabric: '',
    colors: [],
    details: [''],
    description: '',
    stock: '',
    productCode: '', // Add productCode to the formData state
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'mainImage') {
      setFormData({ ...formData, mainImage: files[0] });
    } else if (name === 'secondaryImages') {
      setFormData({ ...formData, secondaryImages: Array.from(files) });
    } else if (name === 'colors') {
      setFormData({ ...formData, colors: value.split(',').map(color => color.trim()) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDetailChange = (index, value) => {
    const details = [...formData.details];
    details[index] = value;
    setFormData({ ...formData, details });
  };

  const addDetail = () => {
    setFormData({ ...formData, details: [...formData.details, ''] });
  };

  const removeDetail = (index) => {
    const details = [...formData.details];
    details.splice(index, 1);
    setFormData({ ...formData, details });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    // Append all fields to FormData
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item) => form.append(key, item));
      } else {
        form.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post('http://localhost:5000/v2/products/', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Product created:', response.data);
      
      // Reset form data
      setFormData({
        name: '',
        price: '',
        tags: '',
        mainImage: null,
        secondaryImages: [],
        size: '',
        length: '',
        fabric: '',
        colors: [],
        details: [''],
        description: '',
        stock: '',
        productCode: '', // Reset productCode
      });
      setError(''); // Clear any previous error message
    } catch (error) {
      console.error('Error occurred during submission:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        setError(error.response.data.message || 'Error occurred. Please try again.');
      } else if (error.request) {
        console.error('Request data:', error.request);
        setError('No response from server. Please check your connection.');
      } else {
        setError('Error: ' + error.message);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Create Product</Typography>
      {error && <Typography color="error">{error}</Typography>} {/* Display error message */}
      <TextField name="productCode" label="Product Code" onChange={handleChange} required fullWidth /> {/* New field for Product Code */}
      <TextField name="name" label="Name" onChange={handleChange} required fullWidth />
      <TextField name="price" label="Price" type="number" onChange={handleChange} required fullWidth />
      <TextField name="tags" label="Tags (comma-separated)" onChange={handleChange} fullWidth />
      
      <input type="file" name="mainImage" onChange={handleChange} required />
      <input type="file" name="secondaryImages" multiple onChange={handleChange} />

      <TextField name="size" label="Size" onChange={handleChange} fullWidth />
      <TextField name="length" label="Length" type="number" onChange={handleChange} fullWidth />
      <TextField name="fabric" label="Fabric" onChange={handleChange} required fullWidth />

      <TextField
        name="colors"
        label="Colors (comma-separated)"
        onChange={handleChange}
        required
        fullWidth
      />

      <Typography variant="h6">Details</Typography>
      {formData.details.map((detail, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <TextField
            value={detail}
            onChange={(e) => handleDetailChange(index, e.target.value)}
            required
            fullWidth
          />
          <IconButton onClick={() => removeDetail(index)}>
            <RemoveIcon />
          </IconButton>
        </Box>
      ))}
      <IconButton onClick={addDetail}>
        <AddIcon />
      </IconButton>

      <TextField name="description" label="Description" onChange={handleChange} required fullWidth />
      <TextField name="stock" label="Stock" type="number" onChange={handleChange} required fullWidth />
      <Button type="submit" variant="contained" color="primary">Submit</Button>
    </Box>
  );
};

export default ProductForm;
