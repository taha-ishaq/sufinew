import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Typography, Button, Grid, Snackbar, Alert, Card, CardMedia, CardContent,useTheme,useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Checkout = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    country: '',
    firstName: '',
    lastName: '',
    address: '',
    apartmentSuite: '',
    city: '',
    postalCode: '',
  });
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    const fetchCartItems = () => {
      const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartItems(savedCartItems);
    };

    fetchCartItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCartItems = [...cartItems];
    updatedCartItems[index][name] = value;
    setCartItems(updatedCartItems);
  };
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Map cartItems to include productId, size, and length
      const formattedCartItems = cartItems.map(item => ({
        productId: item._id, // Ensure _id is sent as productId
        quantity: item.quantity,
        price: item.price,
        size: item.size || '', // Default to empty string if not provided
        length: item.length || '' // Default to empty string if not provided
      }));
  
      console.log('Submit Data:', { ...formData, products: formattedCartItems });
  
      await axios.post('https://sufilatestbe.vercel.app/v2/checkout', { ...formData, products: formattedCartItems });
      setSuccess(true);
      localStorage.removeItem('cartItems'); // Clear cart items after successful checkout
    } catch (err) {
      setError('There was an error processing your order. Please try again.');
    }
  };

  return (
    <>
      <Navbar />

      {/* Alert Snackbar positioned at the top */}
      {success && (
        <Box sx={{ position: 'fixed', top: 0, width: '100%', zIndex: 1500 }}>
          <Alert severity="success" onClose={() => setSuccess(false)}>
            Order placed successfully!
          </Alert>
        </Box>
      )}

      {error && (
        <Box sx={{ position: 'fixed', top: 0, width: '100%', zIndex: 1500 }}>
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Box>
      )}

      <Box sx={{ marginTop: '60px', paddingTop: '20px' }}>
        <Typography variant="h4" gutterBottom>Checkout</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstName"
                fullWidth
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                fullWidth
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                fullWidth
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Country"
                name="country"
                fullWidth
                value={formData.country}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                fullWidth
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Apartment/Suite"
                name="apartmentSuite"
                fullWidth
                value={formData.apartmentSuite}
                onChange={handleChange}
                placeholder="e.g., Apt 4B"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="City"
                name="city"
                fullWidth
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Postal Code"
                name="postalCode"
                fullWidth
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>

          <Box mt={4}>
            <Typography variant="h6">Cart Items:</Typography>
            {cartItems.length === 0 ? (
              <Typography>No items in cart</Typography>
            ) : (
              cartItems.map((item, index) => (
                <Card key={item._id} sx={{ marginTop: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.mainImage}
                        alt={item.name}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <CardContent>
                        <Typography variant="h6">{item.name}</Typography>
                        <Typography variant="body1">Price: Rs:{item.price}</Typography>
                        <TextField
                          label="Size"
                          name="size"
                          value={item.size || ''}
                          onChange={(e) => handleItemChange(index, e)}
                          fullWidth
                        />
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              ))
            )}
          </Box>
          
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center',justifyContent:'center',gap:1,flexDirection:'column',marginBottom:'70px' }}>
            <Button type="submit" color="primary" sx={{ fontFamily: 'Georgia, serif', backgroundColor: 'white',marginTop:'20px',border:'1px solid black',width:'90%',height:isMobile ? '50px' : '60px', color: 'black', '&:hover': {  backgroundColor: 'black', color:'white'} }}>
              Place Order:{calculateTotal}
            </Button>
            <Button type="button" variant="contained" color="primary" onClick={() => navigate('/')} sx={{height:isMobile ? '50px' : '60px',border:'1px solid black', fontFamily: 'Georgia, serif',width:'90%', backgroundColor: 'white', color: 'black', '&:hover': { backgroundColor: 'black', color:'white' } }}>
              Continue Shopping
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default Checkout;
