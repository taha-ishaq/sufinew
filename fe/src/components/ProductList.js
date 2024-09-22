import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, Button } from '@mui/material';
import axios from 'axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://sufilatestbe.vercel.app/v2/products/');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to load products.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(); // Fetch products on component mount
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://sufilatestbe.vercel.app/v2/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (err) {
      setError('Failed to delete product.');
      console.error(err);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      <Typography variant="h4" gutterBottom>Product Management</Typography>
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.mainImage}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Product Code: {product.productCode || 'N/A'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: ${product.price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Stock: {product.stock}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Colors: {Array.isArray(product.colors) ? product.colors.join(', ') : 'N/A'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Description: {product.description || 'N/A'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Details: {Array.isArray(product.details) ? product.details.join(', ') : 'N/A'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Tags: {Array.isArray(product.tags) ? product.tags.join(', ') : 'N/A'} {/* Display tags */}
                </Typography>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(product._id)} style={{ marginLeft: '10px', marginTop: '10px' }}>
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductManagement;
