import React from 'react';
import { Box, Typography } from '@mui/material';

const Featured = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      {/* Left-aligned Heading */}
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold',
          marginBottom: '20px',
          textAlign: 'left', // Align the heading to the left
        }}
      >
        Featured
      </Typography>

      {/* Container for the images */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between', // Distribute space between the images
          alignItems: 'center',
          gap: '10px', // Add some space between the images
          marginTop: '20px',
        }}
      >
        {/* First Image */}
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/banner2.jpeg`} // Replace with your actual image URL
          alt="Featured Image 1"
          sx={{
            width: '45%', // 40% width for the image
            height: 'auto',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />

        {/* Second Image */}
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/banner2.jpeg`} // Replace with your actual image URL
          alt="Featured Image 2"
          sx={{
            width: '45%', // 40% width for the image
            height: 'auto',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
      </Box>
    </Box>
  );
};

export default Featured;
