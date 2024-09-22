import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';

const validTags = [
  'men',
  'woman',
  'bridal',
  'partywear',
  'malestitch',
  'femalestitch',
  'maleunstitch',
  'femaleunstitch',
  'partywear',
  'bridalmen',
  'bridalwoman',
];


const ProductForm = () => {
  const [error, setError] = useState('');
  const [productType, setProductType] = useState(''); // New state for product type
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    tags: [],
    mainImage: null,
    secondaryImages: [],
    size: '',
    length: '',
    fabric: '',
    colors: [],
    details: [''],
    description: '',
    stock: '',
    productCode: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'mainImage') {
      setFormData({ ...formData, mainImage: files[0] });
    } else if (name === 'secondaryImages') {
      setFormData({ ...formData, secondaryImages: Array.from(files) });
    } else if (name === 'colors') {
      setFormData({ ...formData, colors: value.split(',').map(color => color.trim()) });
    } else if (name === 'tags') {
      const tagsArray = value.split(',').map(tag => tag.trim().toLowerCase());
      const invalidTags = tagsArray.filter(tag => !validTags.includes(tag));

      if (invalidTags.length > 0) {
        setError(`Invalid tags: ${invalidTags.join(', ')}. Please use only: ${validTags.join(', ')}.`);
      } else if (tagsArray.includes('woman') && tagsArray.includes('men')) {
        setError("You cannot include 'men' if 'woman' is present.");
      } else {
        setError('');
      }

      setFormData({ ...formData, tags: tagsArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleProductTypeChange = (e) => {
    const value = e.target.value;
    setProductType(value); // Update the product type state
    handleChange(e); // Call the existing handleChange to update formData
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
        tags: [],
        mainImage: null,
        secondaryImages: [],
        size: '',
        length: '',
        fabric: '',
        colors: [],
        details: [''],
        description: '',
        stock: '',
        productCode: '',
      });
      setProductType(''); // Reset product type
      setError(''); // Clear error message
  
      // Refresh the page
      window.location.reload(); // This will refresh the entire page
    } catch (error) {
      console.error('Error during submission:', error);
      if (error.response) {
        setError(error.response.data.message || 'Error occurred. Please try again.');
      } else {
        setError('Error: ' + error.message);
      }
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Create Product</Typography>
      {error && <Typography color="error">{error}</Typography>}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Product Type</InputLabel>
            <Select name="productType" onChange={handleProductTypeChange} required>
              <MenuItem value="woman">Woman</MenuItem>
              <MenuItem value="man">Man</MenuItem>
              <MenuItem value="bridal">Bridal</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField name="productCode" label="Product Code" onChange={handleChange} required fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField name="name" label="Name" onChange={handleChange} required fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField name="price" label="Price" type="number" onChange={handleChange} required fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="tags"
            label="Tags (comma-separated)"
            onChange={handleChange}
            value={formData.tags.join(', ')}
            required
            fullWidth
            helperText={`Valid tags: ${validTags.join(', ')}${productType === 'bridal' ? ' (Include "bridalmale" or "bridalfemale" with "bridal" to fetch right data.)' : ''}`}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField name="size" label="Size" onChange={handleChange} fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField name="length" label="Length" type="number" onChange={handleChange} fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField name="fabric" label="Fabric" onChange={handleChange} required fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="colors"
            label="Colors (comma-separated)"
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
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
        </Grid>

        <Grid item xs={12}>
          <TextField name="description" label="Description" onChange={handleChange} required fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField name="stock" label="Stock" type="number" onChange={handleChange} required fullWidth />
        </Grid>

        {/* File Inputs at the Bottom */}
        <Grid item xs={12}>
          <Typography variant="h6">Upload Images</Typography>
          <input type="file" name="mainImage" onChange={handleChange} required />
        </Grid>

        <Grid item xs={12}>
          <input type="file" name="secondaryImages" multiple onChange={handleChange} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductForm;
