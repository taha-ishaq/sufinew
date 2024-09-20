import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';

const NewIn = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/v2/products/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '20px', marginTop: '60px' }}>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={6} sm={4} md={3} key={product._id}>
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                cursor: 'pointer',
              }}
              component={Link}
              to={`/product/${product._id}`} // This should be correct
              sx={{ textDecoration: 'none' }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.mainImage}
                alt={product.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" sx={{ marginBottom: 1 }}>
                  {product.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ flex: 0.7 }}>RS {product.price}</span>
                  <IconButton
                    onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                    sx={{ color: 'black', flex: 0.3 }}
                  >
                    <AddShoppingCartIcon />
                  </IconButton>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default NewIn;
