import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Grid, Button, IconButton, Collapse, List, ListItem, ListItemText } from '@mui/material';
import { ArrowBack, AccessTime, CreditCard, Add, Remove } from '@mui/icons-material';
import Navbar from '../components/Navbar';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openDelivery, setOpenDelivery] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [option, setOption] = useState('unstitched');
  const [size, setSize] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/v2/products/${id}`);
        console.log('Fetched product:', response.data); // Log product data
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(prev + change, 1));
  };

  const handleAddToCart = () => {
    if (product.stock === 0) {
      console.log('Product is out of stock');
      return; // Prevent adding out of stock items to the cart
    }

    if (addToCart && product) {
      const updatedProduct = { ...product, quantity, option, size };
      console.log('Adding to cart:', updatedProduct); // Log updated product data

      addToCart(updatedProduct);

      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const existingItemIndex = cartItems.findIndex(item => item._id === product._id);

      if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity += quantity;
        cartItems[existingItemIndex].option = option;
        cartItems[existingItemIndex].size = size;
      } else {
        cartItems.push(updatedProduct);
      }

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      console.log('Cart items:', cartItems); // Log cart items

      navigate('/cart');
    } else {
      console.error('addToCart is not a function or product is null');
    }
  };

  if (!product) {
    return (
      <Box sx={{ padding: 4 }}>
        <Navbar />
        <Typography variant="h6" mt={2}>Loading product details...</Typography>
      </Box>
    );
  }
  const styles = {
    '@keyframes slideAnimation': {
      '0%': {
        backgroundPosition: '100% 0',
      },
      '100%': {
        backgroundPosition: '0 0',
      },
    },
  };
  return (
    <>
      <Box sx={{ padding: 4 }}>
        <Navbar />
      </Box>
      <Box sx={{ marginTop: '100px', paddingTop: '20px', paddingX: 4 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ marginBottom: 2 }}>
          <ArrowBack /> Back
        </IconButton>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img
              src={selectedImage || product.mainImage}
              alt={product.name}
              style={{ width: '100%', borderRadius: '8px', maxHeight: '800px', objectFit: 'cover' }}
            />
            <Grid container spacing={1} mt={2}>
              {product.secondaryImages && product.secondaryImages.length > 0 ? (
                product.secondaryImages.map((img, index) => (
                  <Grid item xs={6} key={index} style={{ padding: '0' }}>
                    <img
                      src={img}
                      alt={`Secondary ${index}`}
                      style={{ width: '100%', borderRadius: '8px', maxHeight: '400px', objectFit: 'cover', cursor: 'pointer' }}
                      onClick={() => setSelectedImage(img)}
                    />
                  </Grid>
                ))
              ) : (
                <Typography variant="body2">No additional images available</Typography>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
              {product.name}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
              #{product.productCode}
            </Typography>
            <Typography variant="h6" mt={1} sx={{ color: '#6c757d' }}>
              PKR. {product.price}
            </Typography>
            <Typography variant="h6" mt={1} sx={{ color: product.stock > 0 ? '#28a745' : '#dc3545' }}>
              {product.stock > 0 ? `In stock: ${product.stock}` : 'Out of stock'}
            </Typography>
            <Typography variant="body1" mt={2}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
                Description:
              </Typography>
              {product.description}
            </Typography>
            <Typography variant="h6" mt={2}>Details:</Typography>
<List>
  {Array.isArray(product.details) ? (
    product.details.map((detail, index) => (
      <ListItem key={index}>
        <ListItemText primary={`• ${detail}`} />
      </ListItem>
    ))
  ) : typeof product.details === 'string' ? (
    product.details.split('\n').map((detail, index) => (
      <ListItem key={index}>
        <ListItemText primary={`• ${detail}`} />
      </ListItem>
    ))
  ) : (
    <ListItem>
      <ListItemText primary="No details available." />
    </ListItem>
  )}
</List>
            <Box mt={2}>
              <IconButton onClick={() => setOpenDelivery(!openDelivery)}>
                <AccessTime />
              </IconButton>
              <Typography variant="h6" display="inline" ml={1}>Delivery Time</Typography>
              <Collapse in={openDelivery}>
                <Box mt={2}>
                  <Typography variant="body2">UNSTITCHED (LOCAL): 5-7 WORKING DAYS</Typography>
                  <Typography variant="body2">STITCHED (LOCAL): 18-20 WORKING DAYS</Typography>
                  <Typography variant="body2">UNSTITCHED (INTERNATIONAL): 12-17 WORKING DAYS</Typography>
                  <Typography variant="body2">STITCHED (INTERNATIONAL): 22-24 WORKING DAYS</Typography>
                  <Typography variant="body2">All orders are dispatched around 4pm P.S.T. (Monday-Saturday)</Typography>
                </Box>
              </Collapse>
            </Box>
            <Box mt={2}>
              <IconButton onClick={() => setOpenPayment(!openPayment)}>
                <CreditCard />
              </IconButton>
              <Typography variant="h6" display="inline" ml={1}>Payment Option</Typography>
              <Collapse in={openPayment}>
                <Box mt={2}>
                  <Typography variant="body2">Cash on Delivery (Local orders Only)</Typography>
                </Box>
              </Collapse>
            </Box>

            <Box mt={2}>
              <Typography variant="h6">Select Option:</Typography>
              <Box display="flex" mt={1}>
                <Button
                  variant={option === 'unstitched' ? 'contained' : 'outlined'}
                  sx={{
                    borderColor: '#000000',
                    color: option === 'unstitched' ? '#ffffff' : '#000000',
                    backgroundColor: option === 'unstitched' ? '#000000' : 'transparent',
                    borderRadius: '4px',
                    borderWidth: '1px',
                    padding: '8px 16px',
                    marginRight: 2,
                    '&:hover': {
                      backgroundColor: option === 'unstitched' ? '#000000' : '#f0f0f0',
                      color: option === 'unstitched' ? '#ffffff' : '#000000',
                    },
                  }}
                  onClick={() => setOption('unstitched')}
                >
                  Unstitched
                </Button>
                <Button
                  variant={option === 'stitched' ? 'contained' : 'outlined'}
                  sx={{
                    borderColor: '#000000',
                    color: option === 'stitched' ? '#ffffff' : '#000000',
                    backgroundColor: option === 'stitched' ? '#000000' : 'transparent',
                    borderRadius: '4px',
                    borderWidth: '1px',
                    padding: '8px 16px',
                    '&:hover': {
                      backgroundColor: option === 'stitched' ? '#000000' : '#f0f0f0',
                      color: option === 'stitched' ? '#ffffff' : '#000000',
                    },
                  }}
                  onClick={() => setOption('stitched')}
                >
                  Stitched
                </Button>
              </Box>
            </Box>

            {option === 'stitched' && (
              <Box mt={2}>
                <Typography variant="h6">Select Size:</Typography>
                <Box display="flex" mt={1}>
                  {['XS', 'S', 'M', 'L'].map((sizeOption) => (
                    <Button
                      key={sizeOption}
                      variant={size === sizeOption ? 'contained' : 'outlined'}
                      sx={{
                        borderColor: '#000000',
                        color: size === sizeOption ? '#ffffff' : '#000000',
                        backgroundColor: size === sizeOption ? '#000000' : 'transparent',
                        borderRadius: '4px',
                        borderWidth: '1px',
                        padding: '8px 16px',
                        marginRight: 2,
                        '&:hover': {
                          backgroundColor: size === sizeOption ? '#000000' : '#f0f0f0',
                          color: size === sizeOption ? '#ffffff' : '#000000',
                        },
                      }}
                      onClick={() => setSize(sizeOption)}
                    >
                      {sizeOption}
                    </Button>
                  ))}
                </Box>
              </Box>
            )}

            <Box display="flex" alignItems="center" mt={4}>
              <IconButton onClick={() => handleQuantityChange(-1)} disabled={quantity === 1}>
                <Remove />
              </IconButton>
              <Typography variant="body1" sx={{ mx: 2 }}>
                {quantity}
              </Typography>
              <IconButton onClick={() => handleQuantityChange(1)}>
                <Add />
              </IconButton>
            </Box>
            <Box mt={4}>
              {product.stock == 0 ? (
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    borderRadius: '4px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: 'gray',
                    color: 'white',
                    '&:hover': { backgroundColor: 'gray' },
                    cursor: 'not-allowed',
                  }}
                
                >
                 Out of Stock
                </Button>
              ) : (
                <Button
                variant="contained"
                sx={{
                  ...styles, // Apply the animation styles
                  borderRadius: '4px',
                  padding: '10px 20px',
                  fontSize: '16px',
                  width: '100%',
                  color: '#000000', // Initial text color
                  backgroundColor: '#ffffff', // Initial background color
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid #000000',
                  textTransform: 'none',
                  transition: 'color 0.3s ease, background-color 0.3s ease', // Smooth transition
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#000000',
                    zIndex: 0,
                    transition: 'left 0.3s ease',
                  },
                  '&:hover': {
                    color: '#ffffff', // Text color on hover
                    backgroundColor: '#000000', // Background color on hover
                    '&::after': {
                      left: '0%',
                    },
                  },
                  '& span': {
                    position: 'relative',
                    zIndex: 1,
                  },
                }}
                onClick={handleAddToCart}
              >
                <span>Add to cart</span>
              </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProductDetail;
