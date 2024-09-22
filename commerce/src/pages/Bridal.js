import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, useTheme, useMediaQuery, IconButton, Select, MenuItem, CircularProgress, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';

const Bridal = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOption, setFilterOption] = useState('bridal'); // Set default filter
  const [sortOption, setSortOption] = useState('none');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let tagQuery = filterOption; // Use filter option directly

      try {
        const response = await axios.get(`http://localhost:5000/v2/products/tags?tag=${tagQuery}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filterOption]);

  const sortedProducts = () => {
    let sorted = [...products];

    if (sortOption === 'alphabeticalAsc') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'alphabeticalDesc') {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === 'priceAsc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceDesc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'newest') {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === 'oldest') {
      sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    return sorted;
  };

  const sortedAndFilteredProducts = sortedProducts();

  return (
    <div style={{ padding: '20px', marginTop: '60px' }}>
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'end' }}>
        <Select
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
          sx={{ height: isMobile ? '40px' : '', fontFamily: 'Georgia, serif', backgroundColor: 'white', color: 'black', '&:hover': { backgroundColor: 'darkgray' } }}
        >
          <MenuItem value="bridal">All</MenuItem>
          <MenuItem value="partywear">Woman-Formals</MenuItem>
          <MenuItem value="bridalmen">Men-Formal</MenuItem>
          <MenuItem value="bridalwoman">Bridal</MenuItem>
        </Select>
        <Select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          sx={{ height: isMobile ? '40px' : '', fontFamily: 'Georgia, serif', backgroundColor: 'white', color: 'black', '&:hover': { backgroundColor: 'darkgray' } }}
        >
          <MenuItem value="none">Sort By</MenuItem>
          <MenuItem value="alphabeticalAsc">A-Z</MenuItem>
          <MenuItem value="alphabeticalDesc">Z-A</MenuItem>
          <MenuItem value="priceAsc">Price Low to High</MenuItem>
          <MenuItem value="priceDesc">Price High to Low</MenuItem>
          <MenuItem value="newest">Newest First</MenuItem>
          <MenuItem value="oldest">Oldest First</MenuItem>
        </Select>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>Loading Products...</Typography>
        </Box>
      ) : sortedAndFilteredProducts.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <Typography variant="h6">No Products Found</Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {sortedAndFilteredProducts.map((product) => (
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
                  height="170"
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
                      onClick={() => addToCart(product)}
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

export default Bridal;
