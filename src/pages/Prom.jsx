import React from 'react';
import { Box } from "@mui/material";

import Navbar from "../comps/Navbar";
import Footer from "../comps/Footer";
import seniorCaucusPromImage from '../../images/senior_caucus_prom.png';
import "../pages/Home.css";

const Prom = () => {
  return (
    <div>
      <Navbar />
      <Box className="hero-section">
        <Box className="hero-content-wrapper">
            <Box component="img" src={seniorCaucusPromImage} alt="Stuy senior caucus prom" className="home-title-image" />
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default Prom;