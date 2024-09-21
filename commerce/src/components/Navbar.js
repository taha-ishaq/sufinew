import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Drawer, Menu, MenuItem, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({ cartItemsCount }) => {
  const [scrolling, setScrolling] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleScroll = () => {
    setScrolling(window.scrollY > 50);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTagClick = (tag) => {
    handleMenuClose();
    window.location.href = `/collections?tag=${tag}`;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: scrolling ? 'black' : 'white', transition: 'background-color 0.3s ease' }}>
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: '56px', flexWrap: 'wrap' }}>
          <IconButton onClick={toggleDrawer} sx={{ display: { xs: 'block', md: 'none' }, color: scrolling ? 'white' : 'black' }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: scrolling ? 'white' : 'black', textDecoration: 'none', fontFamily: 'Lobster', fontSize: '24px' }}>
            SafiyaKhanum
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button component={Link} to="/woman" sx={{ color: scrolling ? 'white' : 'black', fontWeight: 'bold' }}>Women</Button>
            <Button component={Link} to="/man" sx={{ color: scrolling ? 'white' : 'black', fontWeight: 'bold' }}>Men</Button>
            <Button component={Link} to="/wedding-formals" sx={{ color: scrolling ? 'white' : 'black', fontWeight: 'bold' }}>Wedding Formals</Button>
            <Button component={Link} to="/collections" sx={{ color: scrolling ? 'white' : 'black', fontWeight: 'bold' }}>Collection</Button>
          </Box>

          <Box>
            <IconButton component={Link} sx={{ color: scrolling ? 'white' : 'black' }}>
              <SearchIcon />
            </IconButton>
            <IconButton component={Link} to="/cart" sx={{ color: scrolling ? 'white' : 'black' }}>
              <Badge badgeContent={cartItemsCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerClose} onKeyDown={handleDrawerClose}>
          <Typography variant="h6" sx={{ padding: 2 }}>Menu</Typography>
          <Button component={Link} to="/" sx={{ width: '100%', textAlign: 'left', fontWeight: 'bold', color: 'black' }}>Home</Button>
          <Button component={Link} to="/woman" sx={{ width: '100%', textAlign: 'left', fontWeight: 'bold', color: 'black' }}>Women</Button>
          <Button component={Link} to="/man" sx={{ width: '100%', textAlign: 'left', fontWeight: 'bold', color: 'black' }}>Men</Button>
          <Button component={Link} to="/wedding-formals" sx={{ width: '100%', textAlign: 'left', fontWeight: 'bold', color: 'black' }}>Wedding Formals</Button>
          <Button component={Link} to="/collections" sx={{ width: '100%', textAlign: 'left', fontWeight: 'bold', color: 'black' }}>Collection</Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
