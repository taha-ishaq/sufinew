import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, IconButton, Select, MenuItem, CircularProgress, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';

const Woman = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('none');
  const [priceOrder, setPriceOrder] = useState('none');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/v2/products/tags?tag=woman${sortOption !== 'none' ? `,${sortOption.toLowerCase()}` : ''}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sortOption]);

  // Sort products by price if a priceOrder is selected
  const sortedProducts = () => {
    if (priceOrder === 'asc') {
      return [...products].sort((a, b) => a.price - b.price);
    } else if (priceOrder === 'desc') {
      return [...products].sort((a, b) => b.price - a.price);
    }
    return products;
  };

  return (
    <div style={{ padding: '20px', marginTop: '60px' }}>
     <Box sx={{ mb: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
  <Typography variant="h5" sx={{ mr: { xs: 0, sm: 2 }, mb: { xs: 1, sm: 0 } }}>Sort By:</Typography>
  <Select
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)}
    sx={{ minWidth: { xs: '100%', sm: 120 }, mr: { sm: 2 }, mb: { xs: 1, sm: 0 } }}
  >
    <MenuItem value="none">None</MenuItem>
    <MenuItem value="stitch">Stitch</MenuItem>
    <MenuItem value="unstitch">Unstitch</MenuItem>
  </Select>
  <Select
    value={priceOrder}
    onChange={(e) => setPriceOrder(e.target.value)}
    sx={{ minWidth: { xs: '100%', sm: 120 } }}
  >
    <MenuItem value="none">Sort by Price</MenuItem>
    <MenuItem value="asc">Lowest First</MenuItem>
    <MenuItem value="desc">Highest First</MenuItem>
  </Select>
</Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>Loading Products...</Typography>
        </Box>
      ) : sortedProducts().length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <Typography variant="h6">No Products Found</Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {sortedProducts().map((product) => (
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
      )}
    </div>
  );
};

export default Woman;
