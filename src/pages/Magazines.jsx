import React from 'react';
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from 'framer-motion';
import Navbar from "../comps/Navbar";
import ScrollDownIndicator from '../comps/ScrollDownIndicator';
import { AnimatedHighlight } from '../comps/Highlight';
import seniorCaucusMagazineImage from '../../images/senior_caucus_magazine.png';
import waveBackground from '../../images/background_1.png';
import "../pages/Home.css";
import DropdownBoxes from "../comps/DropdownBoxes";

const PageWrapper = styled(Box)({
  background: '#fff2e2',
  backgroundImage: `url(${waveBackground})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  minHeight: '100vh',
});

const PurpleSlice = styled(motion.div)({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #b4afd2 0%, #ded4f1 100%)',
    zIndex: 0,
    boxShadow: '0 0 80px 60px #b4afd2',
  });

const Magazines = () => {

    const sliceAnimation = {
        initial: { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
        animate: { clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0% 100%)', transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } },
      };

  return (
    <PageWrapper>
      <Navbar />
      <Box className="Magazines">
      <Box className="hero-section">
        <PurpleSlice variants={sliceAnimation} initial="initial" animate="animate" />
        <Box className="hero-content-wrapper">
            <Box component="img" src={seniorCaucusMagazineImage} alt="Stuy senior caucus magazine" className="home-title-image" />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{ position: 'relative', zIndex: 1 }}
                >
                <Typography
                    variant="h2"
                    className="section-title stats-title-highlight"
                    sx={{
                    fontWeight: 400,
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    color: '#322343',
                    }}
                >
                    the senior <AnimatedHighlight>issue</AnimatedHighlight>.
                </Typography>
            </motion.div>
        </Box>
        <ScrollDownIndicator />
      </Box>
      <Box className="content">
        <DropdownBoxes />
      </Box>
      </Box>
    </PageWrapper>
  );
};

export default Magazines;