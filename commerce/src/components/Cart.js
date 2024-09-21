import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button, Grid, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = () => {
      const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      console.log("Fetched Cart Items:", savedCartItems); // Debugging line
      setCartItems(savedCartItems);
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = (id, change) => {
    const updatedCartItems = cartItems.map(item => {
      if (item._id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    const updatedCartItems = cartItems.filter(item => item._id !== itemToDelete._id);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    setOpenDialog(false);
    setItemToDelete(null);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setItemToDelete(null);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <>
      <Navbar cartItems={cartItems} cartItemsCount={cartItems.length} />
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
        {cartItems.length === 0 ? (
          <Typography>Your cart is empty</Typography>
        ) : (
          <Grid container spacing={2}>
            {cartItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Card>
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
                        <Typography variant="body2">Quantity:</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <IconButton onClick={() => handleQuantityChange(item._id, -1)} disabled={item.quantity <= 1}>
                            <Remove />
                          </IconButton>
                          <Typography variant="body1" sx={{ mx: 1 }}>{item.quantity || 1}</Typography>
                          <IconButton onClick={() => handleQuantityChange(item._id, 1)}>
                            <Add />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteClick(item)} sx={{ ml: 2 }}>
                            <Delete color="error" />
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {cartItems.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
            <Button variant="contained" color="primary" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
              Continue Shopping
            </Button>
          </Box>
        )}

        <Dialog open={openDialog} onClose={handleCancelDelete}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this item from your cart?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete}>Cancel</Button>
            <Button onClick={handleConfirmDelete} color="error">Delete</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Cart;
