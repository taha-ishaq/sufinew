import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar({ isAuthenticated, handleLogout }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          safiyakhanum Admin Panel
        </Typography>
        {isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/">
              Product List
            </Button>
            <Button color="inherit" component={Link} to="/add-product">
              Add Product
            </Button>
            <Button color="inherit" component={Link} to="/Dashboard">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/orders">
              Orders
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
