import React from 'react';
import { Box } from "@mui/material";

import Navbar from "../comps/Navbar";
import Footer from "../comps/Footer";
import seniorCaucusResourcesImage from '../../images/senior_caucus_resources.png';
import "../pages/Home.css";

const Resources = () => {
  return (
    <div>
      <Navbar />
      <Box className="Resources">
      <Box className="hero-section">
        <Box className="hero-content-wrapper">
            <Box component="img" src={seniorCaucusResourcesImage} alt="Stuy senior caucus resources" className="home-title-image" />
        </Box>
      </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default Resources;