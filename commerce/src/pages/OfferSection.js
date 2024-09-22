import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const OfferSection = () => {
  const imageAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const imageUrls = [
    'https://image.fluxpro.ai/custom/726d0770-ab26-445c-8940-7519b6539e74.jpg',
    'https://image.fluxpro.ai/custom/02504b16-bd95-444d-a38b-50b05875c261.jpg',
    'https://image.fluxpro.ai/custom/32123b0a-30d8-4ffa-a906-00384ecf92a4.jpg',
    'https://image.fluxpro.ai/custom/07210d7b-3247-47d9-babd-ce3e40ce50aa.jpg',
  ];

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        padding: '50px',
        backgroundColor: '#ffffff',
      }}
    >
      {imageUrls.map((url, index) => (
        <motion.div
          key={index}
          initial="hidden"
          animate="visible"
          variants={imageAnimation}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <LazyLoadImage
            src={url}
            alt={`Offer Image ${index + 1}`}
            effect="blur" // Optional: adds a blur effect during loading
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </motion.div>
      ))}
    </Box>
  );
};

export default OfferSection;
