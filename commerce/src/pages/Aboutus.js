import React from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  Pinterest,
  LinkedIn,
  YouTube,
} from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";

const AboutUs = () => {
  const theme = useTheme();
  const isExtraSmall = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px 0",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: 2,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: isExtraSmall ? "2rem" : "2.5rem",
        }}
      >
        About Us
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontSize: isExtraSmall ? "1rem" : "1.3rem",
          lineHeight: 1.8,
          textAlign: "center",
          marginBottom: 4,
          color: theme.palette.text.primary,
        }}
      >
        Welcome to the exquisite world of <strong>Safiya Khanum</strong>, where elegance meets tradition. Our designs are a celebration of culture, craftsmanship, and contemporary style.
      </Typography>

      <Box
        sx={{
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          overflow: "hidden",
          position: "relative",
          marginBottom: 4,
        }}
      >
        <img
          src="banner1.jpeg" // Replace with your image URL
          alt="About Us"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <IconButton
          href="https://www.facebook.com/share/tWprYsnM25DyChsA/?mibextid=qi2Omg"
          sx={{ margin: 1 }}
        >
          <Facebook />
        </IconButton>
        <IconButton
          href="https://pin.it/1xhd6K3rJ"
          sx={{ margin: 1 }}
        >
          <Pinterest />
        </IconButton>
        <IconButton
          href="https://www.instagram.com/safiyakhanumofficial?igsh=MWpjdnV5ZXhvdHFiMA=="
          sx={{ margin: 1 }}
        >
          <Instagram />
        </IconButton>
        <IconButton
          href="https://www.linkedin.com/in/safiyah-khanum-856172325?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          sx={{ margin: 1 }}
        >
          <LinkedIn />
        </IconButton>
        <IconButton
          href="https://youtube.com/@safiyakhanum?si=KDdkj4bHP9pU4Cw"
          sx={{ margin: 1 }}
        >
          <YouTube />
        </IconButton>
        <IconButton
          href="https://www.tiktok.com/@safiyakhanumofficial?_t=8pAdNI2NUsD&_r=1"
          sx={{ margin: 1 }}
        >
          <FontAwesomeIcon icon={faTiktok} />
        </IconButton>
      </Box>

      {/* Google Maps Embed */}
      <Box sx={{ marginTop: 4, width: "100%", maxWidth: "600px", height: "400px" }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212645.32758412763!2d73.08610799999998!3d33.61611625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0x6059515c3bdb02b6!2sIslamabad%2C%20Islamabad%20Capital%20Territory!5e0!3m2!1sen!2s!4v1726879027576!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Location Map"
        />
      </Box>
    </Box>
  );
};

export default AboutUs;
