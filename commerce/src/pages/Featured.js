import React from 'react';
import { Box, Typography } from '@mui/material';
import Slider from 'react-slick';
import { useTheme, useMediaQuery } from '@mui/material';

const Featured = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // For detecting small screens

  // Slider settings for slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 2, // Show 1 image on mobile, 2 on larger screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Hides arrows, but can enable if needed
  };

  return (
    <Box sx={{ padding: '20px' }}>
      {/* Left-aligned Heading */}
      <Typography
        variant="h5"
        sx={{
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold',
          marginBottom: '20px',
          textAlign: 'left', // Align the heading to the left
        }}
      >
        Safiya's Work
      </Typography>

      {/* Slider for the images */}
      <Slider {...settings}>
        {/* First Image */}
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/aari.jpeg`} // Replace with your actual image URL
          alt="Featured Image 1"
          sx={{
            width: isMobile ?' 100%' : '100%',  // Full width for the image
            height: isMobile ? '300px' : '350px',
            objectFit: isMobile ? 'fill' : 'fill',
            borderRadius: '8px',
               border:'10px solid white'
          }}
        />

        {/* Second Image */}
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/aari2.jpeg`} // Replace with your actual image URL
          alt="Featured Image 2"
          sx={{
            width: isMobile ?' 100%' : '100%', // Full width for the image
            height: isMobile ? '300px' : '350px',
            objectFit: isMobile ? 'fill' : 'fill',
            borderRadius: '8px',
            border:'10px solid white'
          }}
        />

        {/* Third Image */}
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/aari7.jpeg`} // Replace with your actual image URL
          alt="Featured Image 3"
          sx={{
            width: isMobile ?' 100%' : '100%', // Full width for the image
            height: isMobile ? '300px' : '350px',
            objectFit: isMobile ? 'fill' : 'fill',
            borderRadius: '8px',
               border:'10px solid white'
          }}
        />

        {/* Add more images here */}
      </Slider>
    </Box>
  );
};

export default Featured;
