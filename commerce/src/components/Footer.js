import React, { useState } from 'react';
import { Box, Typography, IconButton, TextField, Button, useTheme } from '@mui/material';
import { Facebook, Instagram, Pinterest, LinkedIn, YouTube } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok } from '@fortawesome/free-brands-svg-icons'; 
import axios from 'axios';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const theme = useTheme();

  const postEmail = async () => {
    try {
      const response = await axios.post('https://sufiyakhanum.vercel.app/userEmails', { email });
      setSuccess('Successfully subscribed!');
      setEmail('');
      setError('');
    } catch (error) {
      console.error('Error subscribing:', error);
      setError('Failed to subscribe. Please try again.');
      setSuccess('');
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter a valid email');
    } else {
      postEmail();
    }
  };

  return (
    <Box
      sx={{
     
         width:'100%',
      maxWidth: '2500px',
        margin: 'auto',
        //  padding: { xs: 2, sm: 4 },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        backgroundColor: 'black', // Set background color to black
        color: 'white', // Set text color to white
        borderTop: `1px solid ${theme.palette.divider}`,
        overflowX:'hidden'
      }}
    >
      {/* About Section */}
      <Box
        sx={{
          flex: 1,
          padding: { xs: 2, sm: 4 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', sm: 'flex-start' },
          marginBottom: { xs: 4, sm: 0 },
          textAlign: { xs: 'center', sm: 'left' },
          '& > p': {
            marginBottom: 2,
            fontSize: '0.9rem',
          },
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          ABOUT SAFIYA KHANUM
        </Typography>
        <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
          Safiya Khanum blends traditional elegance with contemporary style. Our collections are thoughtfully designed to offer timeless fashion with a modern twist, crafted from high-quality materials.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' }, flexWrap: 'wrap', gap: 1 }}>
          <IconButton href="https://www.facebook.com/share/tWprYsnM25DyChsA/?mibextid=qi2Omg" sx={{ marginRight: 1 }}>
            <Facebook sx={{ color: 'white' }} />
          </IconButton>
          <IconButton href="https://www.instagram.com/safiyakhanumofficial?igsh=MWpjdnV5ZXhvdHFiMA==" sx={{ marginRight: 1 }}>
            <Instagram sx={{ color: 'white' }} />
          </IconButton>
          <IconButton href="https://www.linkedin.com/in/safiyah-khanum-856172325?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" sx={{ marginRight: 1 }}>
            <LinkedIn sx={{ color: 'white' }} />
          </IconButton>
          <IconButton href="https://pin.it/1xhd6K3rJ" sx={{ marginRight: 1 }}>
            <Pinterest sx={{ color: 'white' }} />
          </IconButton>
          <IconButton href="https://youtube.com/@safiyakhanum?si=KDdkj4bHP9pU4Cw_https://youtube.com/@safiyakhanum?si=KDdkj4bHP9pU4Cw_" sx={{ marginRight: 1 }}>
            <YouTube sx={{ color: 'white' }} />
          </IconButton>
          <IconButton href="https://www.tiktok.com/@safiyakhanumofficial?_t=8pAdNI2NUsD&_r=1">
            <FontAwesomeIcon icon={faTiktok} style={{ color: 'white' }} />
          </IconButton>
        </Box>
        <Box sx={{ marginTop: 5,

            
         }}>
          Contact us at
          <br />
          <span
            style={{
              display: 'inline-block',
              background: 'black',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textDecoration: 'none',
            }}
          >
            <a
              href="mailto:safiyakhanum73@gmail.com"
              style={{
                color: 'white', // Change link color to white
                textDecoration: 'none',
              }}
            >
             <b>safiyakhanum73@gmail.com</b>
            </a>
          </span>
        </Box>
        <Typography variant="body2" sx={{ fontSize: '0.9rem', marginTop: 2 }}>
          © 2024 - Safiya Khanum | Luxury Womenwear
        </Typography>
      </Box>

      {/* Customer Hub Section */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: { xs: 2, sm: 4 },
          alignItems: { xs: 'center', sm: 'center', md: 'flex-start' },
          borderLeft: { xs: 'none', sm: `1px solid ${theme.palette.divider}` },
          paddingLeft: { xs: 0, sm: 0 },
          paddingRight: { xs: 0, sm: 4 },
          marginBottom: { xs: 4, sm: 0 },
          textAlign: { xs: 'center', sm: 'center', md: 'left' },
          '& > h6': {
            marginBottom: 2,
            fontWeight: 'bold',
          },
          '& > a': {
            margin: '8px',
            textDecoration: 'none',
            color: 'white', // Change link color to white
          },
        }}
      >
        <Typography variant="h7">CUSTOMER HUB</Typography>
        <RouterLink to="/" style={{ color: 'white' }}>HOME</RouterLink>
        <RouterLink to="/privacy" style={{ color: 'white' }}>PRIVACY</RouterLink>
        <RouterLink to="/terms" style={{ color: 'white' }}>TERMS OF USE</RouterLink>
      <Box sx={{ marginTop: 4, maxWidth: "290px", height: "220px" }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212645.32758412763!2d73.08610799999998!3d33.61611625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0x6059515c3bdb02b6!2sIslamabad%2C%20Islamabad%20Capital%20Territory!5e0!3m2!1sen!2s!4v1726879027576!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Location Map"
        />
      </Box>
      </Box>
      {/* Newsletter Section */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: { xs: 2, sm: 4 },
          alignItems: { xs: 'center', sm: 'center', md: 'start' },
          '& > h6': {
            marginBottom: 2,
            fontWeight: 'bold',
            justifyContent:'start'
          },
          '& > p': {
            marginBottom: 2,
            fontSize: '0.9rem',
          },
          '& > .footer-input': {
            marginBottom: 2,
            width: '100%',
          },
          '& > .footer-button': {
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          },
        }}
      >
        <Typography variant="h6">Newsletter</Typography>
        <Typography variant="body2">
          Subscribe to receive updates, access to exclusive deals, and more.
        </Typography>
        <TextField
          className="footer-input"
          variant="outlined"
          placeholder="E-mail"
          size="small"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{bgcolor:'white'}}
        />
        <Button
          className="footer-button"
          variant="contained"
          fullWidth
          onClick={handleSubscribe}
        >
          Subscribe
        </Button>

        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">{success}</Typography>}
      </Box>
    </Box>
  );
};

export default Footer;
