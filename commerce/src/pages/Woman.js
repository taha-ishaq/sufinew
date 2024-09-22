import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, IconButton, useTheme, useMediaQuery, Box, CircularProgress, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';

const Woman = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('woman');
  const [filterOption, setFilterOption] = useState('none');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://sufilatestbe.vercel.app/v2/products/tags?tag=${category}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const sortedFilteredProducts = () => {
    let filtered = [...products];

    // Filter by price, alphabetical order, or product age
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
      <Box sx={{ mb: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' , justifyContent:isMobile ? 'center': 'end' }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {/* Category Select */}
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{ height: isMobile ? '40px' : '', fontFamily: 'Georgia, serif', backgroundColor: 'white', color: 'black', '&:hover': { backgroundColor: 'darkgray' } }}
          >
            <MenuItem value="woman">All</MenuItem>
            <MenuItem value="femalestitch">Stitch</MenuItem>
            <MenuItem value="femaleunstitch">Unstitch</MenuItem>
          </Select>

          {/* Filter Select */}
          <Select
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
            sx={{ height: isMobile ? '40px' : '', fontFamily: 'Georgia, serif', backgroundColor: 'white', color: 'black', '&:hover': { backgroundColor: 'darkgray' } }}
          >
            <MenuItem value="none">Sort by Price</MenuItem>
            <MenuItem value="asc">Low-High</MenuItem>
            <MenuItem value="desc">High-Low</MenuItem>
            <MenuItem value="alphabeticalAsc">A-Z</MenuItem>
            <MenuItem value="alphabeticalDesc">Z-A</MenuItem>
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
          </Select>
        </Box>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>Loading Products...</Typography>
        </Box>
      ) : sortedFilteredProducts().length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <Typography variant="h6">No Products Found</Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {sortedFilteredProducts().map((product) => (
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

export default Woman;
