import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton, Box, Drawer } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElMen, setAnchorElMen] = useState(null);
  const [anchorElWedding, setAnchorElWedding] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openWomenMenu = Boolean(anchorEl);
  const openMenMenu = Boolean(anchorElMen);
  const openWeddingMenu = Boolean(anchorElWedding);

  const handleScroll = () => {
    setScrolling(window.scrollY > 50);
  };

  const handleWomenMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenMenuClick = (event) => {
    setAnchorElMen(event.currentTarget);
  };

  const handleWeddingMenuClick = (event) => {
    setAnchorElWedding(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setAnchorElMen(null);
    setAnchorElWedding(null);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: scrolling ? 'black' : 'transparent', transition: 'background-color 0.3s ease', overflow: 'hidden' }}>
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: '56px', flexWrap: 'wrap' }}>
          <IconButton onClick={toggleDrawer} sx={{ display: { xs: 'block', md: 'none' }, color: scrolling ? 'white' : 'black' }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: scrolling ? 'white' : 'black', textDecoration: 'none', fontFamily: 'Lobster, cursive', fontSize: '24px' }}>
            SufiyaKhanum
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button onClick={handleWomenMenuClick} sx={{ color: scrolling ? 'white' : 'black', fontWeight: 'bold' }}>Women</Button>
            <Menu anchorEl={anchorEl} open={openWomenMenu} onClose={handleMenuClose}>
              <MenuItem component={Link} to="/stitched" onClick={handleMenuClose}>Stitched</MenuItem>
              <MenuItem component={Link} to="/unstitched" onClick={handleMenuClose}>Unstitched</MenuItem>
            </Menu>

            <Button onClick={handleMenMenuClick} sx={{ color: scrolling ? 'white' : 'black', fontWeight: 'bold' }}>Men</Button>
            <Menu anchorEl={anchorElMen} open={openMenMenu} onClose={handleMenuClose}>
              <MenuItem component={Link} to="/men-stitched" onClick={handleMenuClose}>Stitched</MenuItem>
              <MenuItem component={Link} to="/men-unstitched" onClick={handleMenuClose}>Unstitched</MenuItem>
            </Menu>

            <Button onClick={handleWeddingMenuClick} sx={{ color: scrolling ? 'white' : 'black', fontWeight: 'bold' }}>Wedding Formals</Button>
            <Menu anchorEl={anchorElWedding} open={openWeddingMenu} onClose={handleMenuClose}>
              <MenuItem component={Link} to="/bridal" onClick={handleMenuClose}>Bridal</MenuItem>
              <MenuItem component={Link} to="/party-wear" onClick={handleMenuClose}>Party Wear</MenuItem>
            </Menu>

            <Button component={Link} to="/all" sx={{ color: scrolling ? 'white' : 'black', fontWeight: 'bold' }}>Collection</Button>
          </Box>

          <Box>
            <IconButton component={Link} to="/cart" sx={{ color: scrolling ? 'white' : 'black' }}>
              <ShoppingCartIcon />
            </IconButton>
            <IconButton component={Link} to="/search" sx={{ color: scrolling ? 'white' : 'black' }}>
              <SearchIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerClose} onKeyDown={handleDrawerClose}>
          <Typography variant="h6" sx={{ padding: 2 }}>Menu</Typography>
          <Button component={Link} to="/" sx={{ width: '100%', textAlign: 'left', fontWeight: 'bold' }}>Home</Button>
          <Button onClick={handleWomenMenuClick} sx={{ width: '100%', textAlign: 'left', fontWeight: 'bold' }}>Women</Button>
          <Menu anchorEl={anchorEl} open={openWomenMenu} onClose={handleMenuClose}>
            <MenuItem component={Link} to="/stitched" onClick={handleMenuClose}>Stitched</MenuItem>
            <MenuItem component={Link} to="/unstitched" onClick={handleMenuClose}>Unstitched</MenuItem>
          </Menu>
          <Button onClick={handleMenMenuClick} sx={{ width: '100%', textAlign: 'left', fontWeight: 'bold' }}>Men</Button>
          <Menu anchorEl={anchorElMen} open={openMenMenu} onClose={handleMenuClose}>
            <MenuItem component={Link} to="/men-stitched" onClick={handleMenuClose}>Stitched</MenuItem>
            <MenuItem component={Link} to="/men-unstitched" onClick={handleMenuClose}>Unstitched</MenuItem>
          </Menu>
          <Button onClick={handleWeddingMenuClick} sx={{ width: '100%', textAlign: 'left', fontWeight: 'bold' }}>Wedding Formals</Button>
          <Menu anchorEl={anchorElWedding} open={openWeddingMenu} onClose={handleMenuClose}>
            <MenuItem component={Link} to="/bridal" onClick={handleMenuClose}>Bridal</MenuItem>
            <MenuItem component={Link} to="/party-wear" onClick={handleMenuClose}>Party Wear</MenuItem>
          </Menu>
          <Button component={Link} to="/all" sx={{ width: '100%', textAlign: 'left', fontWeight: 'bold' }}>Collection</Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
