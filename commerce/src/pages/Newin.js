import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Select, Typography, useTheme, useMediaQuery, IconButton, Box, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';

const NewIn = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filterOption, setFilterOption] = useState('none');
  const [sortOption, setSortOption] = useState('none');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  const getFilteredAndSortedProducts = () => {
    let filtered = [...products];

    // Filter by tags
    if (sortOption !== 'none') {
      filtered = filtered.filter(product => product.tags && product.tags.includes(sortOption));
    }

    // Sort by price, name, or date
    if (filterOption === 'asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filterOption === 'desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filterOption === 'alphabeticalAsc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filterOption === 'alphabeticalDesc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (filterOption === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filterOption === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    return filtered;
  };

  return (
    <div style={{ padding: '20px', marginTop: '60px' }}>
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'end' }}>
        <Select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          sx={{ height: isMobile ? '40px' : '', fontFamily: 'Georgia, serif', backgroundColor: 'white', color: 'black', '&:hover': { backgroundColor: 'darkgray' } }}
        >
          <MenuItem value="none">Sort By</MenuItem>
          <MenuItem value="men">Men</MenuItem>
          <MenuItem value="woman">Women</MenuItem>
          <MenuItem value="bridal">Bridal</MenuItem>
          <MenuItem value="partywear">Partywear</MenuItem>
        </Select>
        <Select
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
          sx={{ height: isMobile ? '40px' : '', fontFamily: 'Georgia, serif', backgroundColor: 'white', color: 'black', '&:hover': { backgroundColor: 'darkgray' } }}
        >
          <MenuItem value="none">Sort by Price</MenuItem>
          <MenuItem value="asc">Lowest First</MenuItem>
          <MenuItem value="desc">Highest First</MenuItem>
          <MenuItem value="alphabeticalAsc">A-Z</MenuItem>
          <MenuItem value="alphabeticalDesc">Z-A</MenuItem>
          <MenuItem value="newest">Newest First</MenuItem>
          <MenuItem value="oldest">Oldest First</MenuItem>
        </Select>
      </Box>

      <Grid container spacing={2}>
        {getFilteredAndSortedProducts().map((product) => (
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
                <Typography variant="h7" component="div" sx={{ marginBottom: 1, fontWeight: 'bold', fontFamily: 'Georgia, serif' }}>
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
                  <span style={{ flex: 0.7 }}><b>RS:{product.price}</b></span>
                  <IconButton
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
