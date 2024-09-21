import React from "react";
import { Box, Typography, Avatar, IconButton, useTheme, useMediaQuery } from "@mui/material";
import Slider from "react-slick";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const SuccessStories = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const sliderRef = React.useRef(null);

  // Custom navigation functions
  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    adaptiveHeight: true,
  };

  const successStories = [
    {
      image: "brand.jpeg", // Replace with your image URL
      name: "Brand Director:  Aamir Ismatullah Ch.",
      message:
        "Our journey is rooted in tradition, and each piece tells a story of culture and craftsmanship.",
    },
    {
      image: "ceo.jpeg", // Replace with your image URL
      name: "CEO:Safiya Khanum Saima Azhar",
      message:
        "We believe in empowering artisans and bringing their timeless skills to the world stage.",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      {/* Page Heading */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "30px",
          fontSize: isMobile ? "2rem" : "2.5rem",
        }}
      >
        Our Success Stories
      </Typography>

      {/* Slider with navigation buttons */}
      <Box
        sx={{
          width: "80%",
          maxWidth: "800px",
          margin: "0 auto",
          position: "relative", // To position buttons
        }}
      >
        {/* Previous Button */}
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            left: -40,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" },
            zIndex: 1,
          }}
        >
          <ArrowBackIos />
        </IconButton>

        {/* Slider */}
        <Slider ref={sliderRef} {...settings}>
          {successStories.map((story, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: 2,
              }}
            >
              {/* Circular Image */}
              <Avatar
                alt={story.name}
                src={story.image}
                sx={{
                  width: isMobile ? "150px" : "200px",
                  height: isMobile ? "150px" : "200px",
                  marginBottom: 3,
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                  margin: "0 auto", // Centers the image
                }}
              />
              {/* Message and Name */}
              <Typography
                variant="body1"
                sx={{
                  fontSize: isMobile ? "1rem" : "1.2rem",
                  marginBottom: 2,
                  color: theme.palette.text.primary,
                }}
              >
                {story.message}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.text.secondary,
                }}
              >
                {story.name}
              </Typography>
            </Box>
          ))}
        </Slider>

        {/* Next Button */}
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            right: -40,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" },
            zIndex: 1,
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SuccessStories;
