import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

const Latest = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant="h4" sx={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', marginBottom: '20px' }}>
        Explore our Latest Collections For You
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',  // Responsive layout for small screens
          justifyContent: 'space-between',
        }}
      >
        {/* Left side with 3 images */}
        <Box sx={{ flex: '1', marginRight: isSmallScreen ? '0' : '10px', display: 'flex', flexDirection: 'column' }}>
          {/* Top long horizontal image */}
          <Box
            sx={{
              width: '100%',
              height: '250px', // Height increased
              backgroundImage: `url(${process.env.PUBLIC_URL}/latest4.jpeg)`,
              backgroundSize: 'cover',
              backgroundPosition: isSmallScreen ? 'center' : 'center', // Centered for smaller screens
              borderRadius: '8px',
              marginBottom: '10px',
            }}
          />
          {/* Two square images below the long image */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', flex: '1' }}>
            <Box
              sx={{
                width: isSmallScreen ? '100%' : '48%', // Full width on small screens
                height: '180px', // Increased height
                backgroundImage: `url(${process.env.PUBLIC_URL}/latest3.jpeg)`,
                backgroundSize: 'cover',
                borderRadius: '8px',
                marginBottom: isSmallScreen ? '10px' : '0', // Margin for small screens
              }}
            />
            <Box
              sx={{
                width: isSmallScreen ? '100%' : '48%', // Full width on small screens
                height: '180px', // Increased height
                backgroundImage: `url(${process.env.PUBLIC_URL}/latest2.jpeg)`,
                backgroundSize: 'cover',
                borderRadius: '8px',
              }}
            />
          </Box>
        </Box>

        {/* Right side image */}
        <Box
          sx={{
            width: isSmallScreen ? '100%' : '30%', // Full width on small screens
            height: isSmallScreen ? '300px' : '100', // Adjust height for small screens
            backgroundImage: `url(${process.env.PUBLIC_URL}/latest1.jpeg)`,
            backgroundSize: 'cover',
            backgroundPosition: isSmallScreen ? 'center' : 'center top', // Focus center for smaller screens
            borderRadius: '8px',
          }}
        />
      </Box>
    </Box>
  );
};

export default Latest;
