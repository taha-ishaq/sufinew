import React from "react";
import { Box, Typography, Avatar, IconButton, useTheme, useMediaQuery } from "@mui/material";
import Slider from "react-slick";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const SuccessStories = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const sliderRef = React.useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    adaptiveHeight: false, // Disable adaptiveHeight to keep fixed height
  };

  const successStories = [
    {
      image: "brand.jpeg",
      role: "Brand Director",
      name: "Aamir Ismatullah Ch.",
      message:
        "Our journey is rooted in tradition, and each piece tells a story of culture and craftsmanship.",
    },
    {
      image: "ceo.jpeg",
      role: "CEO",
      name: "Saima Azhar",
      message:
        "We believe in empowering artists and bringing their timeless skills to the world",
    },
    {
      image: "success2.jpeg",
      role: "DESIGN TEAM:",
      name: "Bushrah, Wasfa, Sadia, Iman, Bakhtawar, Kashaf, Shamaiam",
      message:
       "This collection features flowing silhouettes, bold colors, and delicate details, all carefully crafted to make a statement. We're inspired by the modern woman's strength and sophistication, and we're excited to share our vision with you.- Design Team" ,
    },
  ];

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const handlePrevious = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        position: "relative",
        overflow: "hidden", // Prevent any scrolling
        height: isMobile ? "400px" : "450px", // Fixed height for larger screens, auto for mobile
      }}
    >
      {/* Page Heading */}
      <Typography
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "30px",
          fontSize: isMobile ? "20px" : "2.5rem",
        }}
      >
        Our Success Stories
      </Typography>

      {/* Slider */}
      <Box
        sx={{
          width: "100%",
          position: "relative",
          height: "100%",
          maxWidth: "100%", // Ensure full width for both mobile and desktop
        }}
      >
        <Slider ref={sliderRef} {...settings}>
          {successStories.map((story, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                height: "100%",
                width: "100%",
                justifyContent: "center", // Center content vertically
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
                variant="body2"
                sx={{
                  fontSize: isMobile ? "13px" : "1.2rem",
                  marginBottom: 2,
                  color: theme.palette.text.primary,
                  marginTop: "12px",
                }}
              >
                {story.message}
              </Typography>
              <Typography
                variant="h7"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.text.secondary,
                }}
              >
                {story.role}
                <br />
                {story.name}
              </Typography>
            </Box>
          ))}
        </Slider>

        {/* Navigation Buttons */}
      
      </Box>
    </Box>
  );
};

export default SuccessStories;
