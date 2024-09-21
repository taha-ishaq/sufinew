import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, IconButton, Select, MenuItem, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';

const NewIn = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('none');
  const [priceOption, setPriceOption] = useState('none');

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

  const filteredProducts = products.filter(product => {
    if (sortOption === 'none') return true;
    return product.tags && product.tags.includes(sortOption);
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    // Sort by price
    if (priceOption === 'high') return b.price - a.price;
    if (priceOption === 'low') return a.price - b.price;

    return 0; // No sorting if priceOption is 'none'
  });

  return (
    <div style={{ padding: '20px', marginTop: '60px' }}>
   <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
  <Typography variant="h5" sx={{ mr: 2, fontWeight: 'bold', fontFamily: 'Georgia, serif' }}>
    Sort By:
  </Typography>
  <Select
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)}
    sx={{ minWidth: 120, mr: { xs: 0, sm: 2 }, mb: { xs: 1, sm: 0 }, fontFamily: 'Georgia, serif' }}
  >
    <MenuItem value="none">None</MenuItem>
    <MenuItem value="men">Men</MenuItem>
    <MenuItem value="woman">Women</MenuItem>
    <MenuItem value="bridal">Bridal</MenuItem>
    <MenuItem value="partywear">Partywear</MenuItem>
  </Select>
  <Select
    value={priceOption}
    onChange={(e) => setPriceOption(e.target.value)}
    sx={{ minWidth: 120, fontFamily: 'Georgia, serif' }}
  >
    <MenuItem value="none">Price</MenuItem>
    <MenuItem value="low">Lowest First</MenuItem>
    <MenuItem value="high">Highest First</MenuItem>
  </Select>
</Box>

      <Grid container spacing={2}>
        {sortedProducts.map((product) => (
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
              to={`/product/${product._id}`}
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
                <Typography variant="h6" component="div" sx={{ marginBottom: 1, fontWeight: 'bold', fontFamily: 'Georgia, serif' }}>
                  {product.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: 'Georgia, serif',
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
