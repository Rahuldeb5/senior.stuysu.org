import React from 'react';
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Navbar from "../comps/Navbar";
import seniorCaucusMagazineImage from '../../images/senior_caucus_magazine.png';
import waveBackground from '../../images/background_1.png';
import "../pages/Home.css";

const PageWrapper = styled(Box)({
  background: '#fff2e2',
  backgroundImage: `url(${waveBackground})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  minHeight: '100vh',
});

const Magazines = () => {
  return (
    <PageWrapper>
      <Navbar />
      <Box className="Magazines">
      <Box className="hero-section">
        <Box className="hero-content-wrapper">
            <Box component="img" src={seniorCaucusMagazineImage} alt="Stuy senior caucus magazine" className="home-title-image" />
        </Box>
      </Box>
      </Box>
    </PageWrapper>
  );
};

export default Magazines;