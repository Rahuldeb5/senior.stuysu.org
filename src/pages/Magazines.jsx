import React from 'react';
import { Box } from "@mui/material";

import Navbar from "../comps/Navbar";
import seniorCaucusMagazineImage from '../../images/senior_caucus_magazine.png';
import "../pages/Home.css";

const Magazines = () => {
  return (
    <div>
      <Navbar />
      <Box className="Magazines">
      <Box className="hero-section">
        <Box className="hero-content-wrapper">
            <Box component="img" src={seniorCaucusMagazineImage} alt="Stuy senior caucus magazine" className="home-title-image" />
        </Box>
      </Box>
      </Box>
    </div>
  );
};

export default Magazines;