import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent } from '@mui/material';

const Arrivals = () => {
  // Sample static images for each category
  const productImages = {
    man: [
      { id: 1, src: `${process.env.PUBLIC_URL}/banner1.jpeg`, name: 'Man Product 1' },
      { id: 2, src: `${process.env.PUBLIC_URL}/banner1.jpeg`, name: 'Man Product 2' },
      { id: 3, src: `${process.env.PUBLIC_URL}/banner1.jpeg`, name: 'Man Product 3' },
      { id: 4, src: `${process.env.PUBLIC_URL}/banner1.jpeg`, name: 'Man Product 4' },
    ],
    woman: [
      { id: 1, src: `${process.env.PUBLIC_URL}/banner1.jpeg`, name: 'Woman Product 1' },
      { id: 2, src: `${process.env.PUBLIC_URL}/banner1.jpeg`, name: 'Woman Product 2' },
      { id: 3, src: `${process.env.PUBLIC_URL}/banner1.jpeg`, name: 'Woman Product 3' },
      { id: 4, src: `${process.env.PUBLIC_URL}/banner1.jpeg`, name: 'Woman Product 4' },
    ],
    bridal: [
      { id: 1, src: `${process.env.PUBLIC_URL}/banner1.jpeg`, name: 'Bridal Product 1' },
      { id: 2, src: `${process.env.PUBLIC_URL}/banner1.jpeg`, name: 'Bridal Product 2' },
      { id: 3, src: `${process.env.PUBLIC_URL}/banner1.jpeg`, name: 'Bridal Product 3' },
      { id: 4, src: `${process.env.PUBLIC_URL}/banner1.jpeg`, name: 'Bridal Product 4' },
    ],
  };

  const [selectedTag, setSelectedTag] = useState('man');

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  return (
    <Box sx={{ textAlign: 'center', padding: '40px' }}>
      {/* Centered Heading */}
      <Typography
        variant="h4"
        sx={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', marginBottom: '20px' }}
      >
        Explore Our Latest Arrivals
      </Typography>

      {/* Buttons for Categories */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
        {['man', 'woman', 'bridal'].map((tag) => (
          <Button
            key={tag}
            variant="text"
            onClick={() => handleTagClick(tag)}
            sx={{
              textTransform: 'uppercase',
              color: 'black',
              borderBottom: selectedTag === tag ? '2px solid black' : 'none',
            }}
          >
            {tag}
          </Button>
        ))}
      </Box>

      {/* Product Cards */}
      <Grid container spacing={4} justifyContent="center">
        {productImages[selectedTag].map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card sx={{ borderRadius: '8px', overflow: 'hidden' }}>
              {/* Product Image */}
              <CardMedia
                component="img"
                image={product.src}
                alt={product.alt}
                sx={{ height: '250px', objectFit: 'cover' }}
              />
              {/* Product Name with Skin Color Background */}
              <CardContent sx={{ backgroundColor: '#F1C27D', textAlign: 'center' }}>
                <Typography variant="h6">{product.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Arrivals;
