import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function Navbar({ isAuthenticated, handleLogout }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {isAuthenticated ? (
        <>
          <Button color="inherit" component={Link} to="/">Product List</Button>
          <Button color="inherit" component={Link} to="/add-product">Add Product</Button>
          <Button color="inherit" component={Link} to="/Dashboard">Dashboard</Button>
          <Button color="inherit" component={Link} to="/orders">Orders</Button>
          <Button color="inherit" component={Link} to="/mails">Mails</Button>
          <Button color="inherit" component={Link} to="/bulkupload">CSV Upload</Button>
        </>
      ) : (
        <Button color="inherit" component={Link} to="/login">Login</Button>
      )}
    </Box>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          safiyakhanum Admin Panel
        </Typography>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <IconButton onClick={toggleDrawer(false)} color="inherit" sx={{ position: 'absolute', right: 0 }}>
            <CloseIcon />
          </IconButton>
          {menuItems}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
