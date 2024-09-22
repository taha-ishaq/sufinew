import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Add, Delete, Remove } from '@mui/icons-material';
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

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <>
      <Navbar cartItemsCount={cartItems.length} />
      <Box sx={{ padding: 2, marginTop: "40px", display: 'flex', flexDirection: 'column', minHeight: '80vh' }}>
        <Typography variant="h6" align="center" gutterBottom>Shopping Cart</Typography>
        {cartItems.length === 0 ? (
          <Typography>Your cart is empty</Typography>
        ) : (
          <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
            {cartItems.map((item) => (
              <Box key={item._id} sx={{ display: 'flex', alignItems: 'stretch', borderBottom: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                <img src={item.mainImage} alt={item.name} style={{ width: '80px', height: '140px', marginRight: '10px', alignSelf: 'center' }} />
                <Box sx={{ flexGrow: 1, textAlign: 'left', marginLeft: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography variant="body1">{item.name}</Typography>
                  <Typography variant="body2">Rs: {item.price}</Typography>
                  <Typography variant="body2">{item.isStitched ? "Stitched" : "Unstitched"}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid black', borderRadius: '5px', padding: '2px' }}>
                      <IconButton onClick={() => handleQuantityChange(item._id, -1)} disabled={item.quantity <= 1}>
                        <Remove />
                      </IconButton>
                      <Typography variant="body1" sx={{ mx: 1 }}>{item.quantity}</Typography>
                      <IconButton onClick={() => handleQuantityChange(item._id, 1)}>
                        <Add />
                      </IconButton>
                    </Box>
                    <IconButton  onClick={() => handleDeleteClick(item)} sx={{ color: 'black', marginLeft: '10px', backgroundColor: 'transparent' }}>
                      <Delete/>
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {cartItems.length > 0 && (
       <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'white', padding: 2, boxShadow: '0 -2px 5px  rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
       <Typography variant="h6" sx={{ marginBottom: 1 }}><b>Subtotal: Rs: {calculateTotal()}</b></Typography>
       <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
         <Button variant="contained" color="black" onClick={handleCheckout} sx={{ flex: 1, marginRight: 1, color: 'white' ,bgcolor:'black' }}>
           Proceed to Checkout
         </Button>
         <Button variant="contained" color="black" onClick={() => navigate('/')} sx={{ flex: 1, marginLeft: 1, color: 'white' ,bgcolor:'black'}}>
           Continue Shopping
         </Button>
       </Box>
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
