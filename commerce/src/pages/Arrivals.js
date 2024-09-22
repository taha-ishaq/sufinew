import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, useMediaQuery, useTheme, IconButton } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Slider from 'react-slick';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Arrivals = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const productImages = {
    man: [
      { id: 1, src: `${process.env.PUBLIC_URL}/pic1.jpeg`, name: 'Men Product', price:'Rs:450' },
      { id: 2, src: `${process.env.PUBLIC_URL}/pic2.jpeg`, name: 'Man Product 2', price:'Rs:450' },
      { id: 3, src: `${process.env.PUBLIC_URL}/pic3.jpeg`, name: 'Man Product 3', price:'Rs:450' },
      { id: 4, src: `${process.env.PUBLIC_URL}/pic4.jpeg`, name: 'Man Product 4', price:'Rs:450' },
    ],
    woman: [
      { id: 1, src: `${process.env.PUBLIC_URL}/pic5.jpeg`, name: 'Woman Product 1', price:'Rs:450' },
      { id: 2, src: `${process.env.PUBLIC_URL}/pic6.jpeg`, name: 'Woman Product 2', price:'Rs:450' },
      { id: 3, src: `${process.env.PUBLIC_URL}/pic7.jpeg`, name: 'Woman Product 3' ,price:'Rs:450' },
      { id: 4, src: `${process.env.PUBLIC_URL}/pic8.jpeg`, name: 'Woman Product 4', price:'Rs:450' },
    ],
    bridal: [
      { id: 1, src: `${process.env.PUBLIC_URL}/pic2.jpeg`, name: 'Bridal Product 1', price:'Rs:450' },
      { id: 2, src: `${process.env.PUBLIC_URL}/pic5.jpeg`, name: 'Bridal Product 2', price:'Rs:450' },
      { id: 3, src: `${process.env.PUBLIC_URL}/pic3.jpeg`, name: 'Bridal Product 3', price:'Rs:450' },
      { id: 4, src: `${process.env.PUBLIC_URL}/pic8.jpeg`, name: 'Bridal Product 4', price:'Rs:450' },
    ],
  };

  const [selectedTag, setSelectedTag] = useState('man');
  let sliderRef = null;

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isSmallScreen ? 1 : isLargeScreen ? 2 : 4,
    slidesToScroll: 1,
    arrows: false,
  };

  const handlePrevious = () => {
    sliderRef.slickPrev();
  };

  const handleNext = () => {
    sliderRef.slickNext();
  };

  return (
    <Box sx={{ textAlign: 'center', padding: '20px' }}>
      <Typography
     
        sx={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', marginBottom: '20px' , fontSize:isSmallScreen ? '20px' : '45px' }}
      >
        Explore Our Latest Arrivals
      </Typography>

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
              fontSize:isSmallScreen ? '15px' : '25px'
            }}
          >
            {tag}
          </Button>
        ))}
      </Box>

      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={handlePrevious}
          sx={{ position: 'absolute', top: '50%', left: '0', zIndex: 1, transform: 'translateY(-50%)', color: 'black' }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <Slider {...settings} ref={(slider) => (sliderRef = slider)}>
          {productImages[selectedTag].map((product) => (
            <Box key={product.id} sx={{ padding: isSmallScreen ? '0 10px' : '0 15px' }}>
              <Link to="/collections" style={{ textDecoration: 'none' }}> {/* Wrap Card in Link */}
                <Card sx={{ borderRadius: '8px', overflow: 'hidden', width: '100%', height: '100%',border:'10px solid white' }}>
                  <CardMedia
                    component="img"
                    image={product.src}
                    alt={product.alt}
                    sx={{ objectFit: 'cover', height: isSmallScreen ? '200px' : '300px' }}
                  />
                  <CardContent sx={{ textAlign: 'start' }}>
                    <Typography variant="h5" sx={{ fontSize: isSmallScreen ? '1.25rem' : '1.25rem' }}>
                      <b>{product.name}</b><br></br>
                      <b>{product.price}</b>
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Box>
          ))}
        </Slider>

        <IconButton
          onClick={handleNext}
          sx={{ position: 'absolute', top: '50%', right: '0', zIndex: 1, transform: 'translateY(-50%)', color: 'black' }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Arrivals;
