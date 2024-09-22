import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import Navbar from '../components/Navbar';
import OfferSection from './OfferSection';

const SocialMedia = () => {
  const bounceTransition = {
    y: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
    },
  };
  const iconLinks = {
    facebook: 'https://www.facebook.com/share/tWprYsnM25DyChsA/?mibextid=qi2Omg',
    instagram: 'https://www.instagram.com/safiyakhanumofficial?igsh=MWpjdnV5ZXhvdHFiMA==',
    youtube: 'https://youtube.com/@safiyakhanum?si=KDdkj4bHP9pU4Cw_',
    linkedin: 'https://www.linkedin.com/in/safiyah-khanum-856172325?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    pinterest: 'https://pin.it/1xhd6K3rJ',
    tiktok: 'https://www.tiktok.com/@safiyakhanumofficial?_t=8pAdNI2NUsD&_r=1',
  };
  
  const iconStyle = {
    fontSize: '80px', // Larger icons
    color: 'white',
    position: 'relative',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80px',
    height: '80px',
    margin: '0 20px',
  };

  const { ref: sectionRef, inView: isSectionVisible } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
      <Box sx={{ padding: 4 }}>
        <Navbar />
      </Box>
      <Box
        sx={{
          background: `linear-gradient(135deg, #ff0084, #33001b)`,
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          overflow: 'hidden',
         paddingX: 4
        }}
      >
        {/* Majestic Header */}
        <motion.div
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              letterSpacing: '0.1em',
              textAlign: 'center',
              marginBottom: '30px',
              fontSize: { xs: '2rem', sm: '3rem' }, // Responsive font size
            }}
          >
            Safiya Khanum - Welcome to Our World
          </Typography>
        </motion.div>

        {/* Social Media Icons */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '30px',
            gap: { xs: '20px', sm: '40px' }, // Responsive gap
          }}
        >
          {/* First Row of Icons */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: '600px',
              gap: { xs: '20px', sm: '30px' }, // Responsive gap between icons
              flexWrap: 'wrap', // Allow wrapping on smaller screens
              justifyContent: 'center', // Center the icons
            }}
          >
            {['facebook', 'instagram', 'youtube'].map((icon) => (
              <Card
                key={icon}
                sx={{
                  width: { xs: '80px', sm: '150px' }, // Responsive width
                  background: 'transparent',
                  boxShadow: 'none',
                  transition: 'background 0.5s ease-in-out',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #ff0084, #33001b)',
                  },
                }}
                elevation={0}
                component={motion.div}
              >
                <CardContent
                  sx={{
                    textAlign: 'center',
                    padding: '10px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <a
                    href={iconLinks[icon]}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      style={iconStyle}
                    >
                      <i className={`fab fa-${icon}`}></i>
                    </motion.div>
                  </a>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Second Row of Icons */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: '600px',
              gap: { xs: '20px', sm: '30px' }, // Responsive gap between icons
              flexWrap: 'wrap', // Allow wrapping on smaller screens
              justifyContent: 'center', // Center the icons
            }}
          >
            {['linkedin', 'pinterest', 'tiktok'].map((icon) => (
              <Card
                key={icon}
                sx={{
                  width: { xs: '80px', sm: '150px' }, // Responsive width
                  background: 'transparent',
                  boxShadow: 'none',
                  transition: 'background 0.5s ease-in-out',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #ff0084, #33001b)',
                  },
                }}
                elevation={0}
                component={motion.div}
              >
                <CardContent
                  sx={{
                    textAlign: 'center',
                    padding: '10px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <a
                    href={iconLinks[icon]}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      style={iconStyle}
                    >
                      <i className={`fab fa-${icon}`}></i>
                    </motion.div>
                  </a>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Bouncing Circles */}
        <motion.div
          animate={{ y: ['0%', '-50%', '0%'] }}
          transition={{ ...bounceTransition, delay: 0.2 }}
          style={{
            position: 'absolute',
            top: '30%',
            left: '30%',
            width: { xs: '20px', sm: '40px' }, // Responsive width
            height: { xs: '20px', sm: '40px' }, // Responsive height
            backgroundColor: 'white',
            borderRadius: '50%',
          }}
        />

        <motion.div
          animate={{ y: ['0%', '-50%', '0%'] }}
          transition={{ ...bounceTransition, delay: 0.2 }}
          style={{
            position: 'absolute',
            top: '90%',
            right: '30%',
            width: { xs: '20px', sm: '40px' }, // Responsive width
            height: { xs: '20px', sm: '40px' }, // Responsive height
            backgroundColor: 'white',
            borderRadius: '50%',
          }}
        />
      </Box>

      <OfferSection />

      {/* Offer Section */}
      <Box
        ref={sectionRef}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }, // Responsive layout
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: { xs: '20px', sm: '50px' }, // Responsive padding
          background: 'linear-gradient(135deg, #ed4264, #ffedbc)', // Peach gradient
          opacity: isSectionVisible ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ flex: 1, paddingRight: { xs: '0', sm: '20px' } }} // Responsive padding
        >
          <img
            src="image.png" // Replace with your image path
            alt="Offer Image"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              display: 'block',
            }}
          />        
        </motion.div>

        <Box sx={{ flex: 1 }}>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ flex: 1 }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                marginBottom: '20px',
                textAlign: 'left',
                fontSize: { xs: '1.5rem', sm: '2rem' }, // Responsive font size
              }}
            >
              Share & Win Exciting Offers!
            </Typography>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.6,
                textAlign: 'left',
                fontSize: { xs: '0.875rem', sm: '1rem' }, // Responsive font size
              }}
            >
              Send us your video or pictures of you sharing Safiya Khanum's products on social media, and stand a chance to win exciting new offers and discounts! Tag us and use the hashtag #SafiyaKhanum in your posts. We can't wait to see your amazing content!
              #SafiyaLifeStyle
            </Typography>
          </motion.div>
        </Box>
      </Box>
    </>
  );
};

export default SocialMedia;
