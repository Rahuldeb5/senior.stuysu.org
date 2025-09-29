import React from 'react';
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Navbar from "../comps/Navbar";
import Footer from "../comps/Footer";
import seniorCaucusResourcesImage from '../../images/senior_caucus_resources.png';
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

const Resources = () => {
  return (
    <PageWrapper>
      <Navbar />
      <Box className="Resources">
      <Box className="hero-section">
        <Box className="hero-content-wrapper">
            <Box component="img" src={seniorCaucusResourcesImage} alt="Stuy senior caucus resources" className="home-title-image" />
        </Box>
      </Box>
      </Box>
      <Footer />
    </PageWrapper>
  );
};

export default Resources;