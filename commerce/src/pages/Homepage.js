import React, { useEffect, useState } from 'react';
import { Box, IconButton, Typography, Button,useTheme,useMediaQuery} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const images = [
  { src: `${process.env.PUBLIC_URL}/banner1.jpeg`, alt: 'Banner 1' },
  { src: `${process.env.PUBLIC_URL}/banner2.jpeg`, alt: 'Banner 2' },
  { src: `${process.env.PUBLIC_URL}/banner3.jpeg`, alt: 'Banner 3' },
  { src: `${process.env.PUBLIC_URL}/banner4.jpeg`, alt: 'Banner 4' },
];

const Homepage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 2500); // Changed to 2500ms for 2.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ position: 'relative', maxWidth: '100%', overflow: 'hidden', height: '500px' }}>
      <img
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: 'cover',
        }}
      />
      <IconButton
        onClick={prevImage}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          color: 'white',
          zIndex: 10,
          transform: 'translateY(-50%)',
        }}
      >
        <ArrowBack />
      </IconButton>
      <IconButton
        onClick={nextImage}
        sx={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          color: 'white',
          zIndex: 10,
          transform: 'translateY(-50%)',
        }}
      >
        <ArrowForward />
      </IconButton>
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Typography sx={{ mb: 2, fontSize: isSmallScreen ? '35px' : '50px',  fontStyle:'lobster'}}>
        <b>Welcome To SafiyaKhanum</b>
        </Typography>
        <Button
        variant="contained"
          onClick={() => navigate('/collections')}
          sx={{
            
            backgroundColor: 'white',
            color: 'black',
            '&:hover': {
              backgroundColor: 'black',
              color:'white'
            },
            padding: isSmallScreen ? '12px' : '15px',
            fontSize: isSmallScreen ? '15px' : '20px',
          
          }}
        >
          <b>Explore More</b>
        </Button>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
      </Box>
    </Box>
  );
};

export default Homepage;
