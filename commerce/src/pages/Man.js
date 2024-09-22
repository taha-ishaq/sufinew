import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, IconButton, useTheme, useMediaQuery, Select, MenuItem, CircularProgress, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';

const Man = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('none');
  const [filterOption, setFilterOption] = useState('none');

  const fetchProducts = async (tag) => {
    setLoading(true);

    try {
      const response = await axios.get(`https://sufilatestbe.vercel.app/v2/products/tags?tag=${tag}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch products on initial load
    fetchProducts('men');
  }, []);

  useEffect(() => {
    // Fetch products based on selected stitch/unstitch option
    if (sortOption === 'malestitch') {
      fetchProducts('malestitch'); // Update this based on your API structure
    } else if (sortOption === 'maleunstitch') {
      fetchProducts('maleunstitch'); // Update this based on your API structure
    } else if (sortOption === 'bridalmen') {
      fetchProducts('bridalmen'); // Ensure that this tag matches your backend's structure
    } else {
      fetchProducts('men'); // Default tag
    }
  }, [sortOption]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const sortedProducts = () => {
    let filtered = [...products];

    // Sort by price if selected
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

  const sortedAndFilteredProducts = sortedProducts();

  return (
    <div style={{ padding: '20px', marginTop: '60px' }}>
      <Box sx={{ mb: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center',justifyContent: isMobile ? 'center' : 'end' }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Select
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              setFilterOption('none'); // Reset filter when sorting
            }}
            sx={{ height: isMobile ? '40px' : '', fontFamily: 'Georgia, serif', backgroundColor: 'white', color: 'black', '&:hover': { backgroundColor: 'darkgray' } }}
          >
            <MenuItem value="none">All</MenuItem>
            <MenuItem value="malestitch">Men-Stitch</MenuItem>
            <MenuItem value="maleunstitch">Men-Unstitch</MenuItem>
            <MenuItem value="bridalmen">Men-Formal</MenuItem> {/* Correct value for 'bridalmen' */}
          </Select>
          <Select
            value={filterOption}
            onChange={(e) => {
              setFilterOption(e.target.value);
              setSortOption('none'); // Reset sorting when filtering
            }}
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
              >
                <CardMedia
                  component="img"
                  height="150"
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

export default Man;
