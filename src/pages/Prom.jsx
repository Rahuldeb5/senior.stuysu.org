import React from 'react';
import { Box, Typography, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from 'framer-motion';
import Navbar from "../comps/Navbar";
import Footer from "../comps/Footer";
import ScrollDownIndicator from '../comps/ScrollDownIndicator';
import { AnimatedHighlight } from '../comps/Highlight';
import seniorCaucusPromImage from '../../images/senior_caucus_prom.png';
import waveBackground from '../../images/background_1.png';
import workInProgressImage from '../../images/work_in_progress.png';
import "../pages/Home.css";

const PageWrapper = styled(Box)({
  background: '#fff2e2',
  backgroundImage: `url(${waveBackground})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const ContentWrapper = styled(Box)({
  flex: 1,
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

const Prom = () => {

    const sliceAnimation = {
        initial: { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
        animate: { clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0% 100%)', transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } },
      };

  return (
    <PageWrapper>
      <Navbar />
      <ContentWrapper>
        <Box className="hero-section">
            <PurpleSlice variants={sliceAnimation} initial="initial" animate="animate" />
          <Box className="hero-content-wrapper">
              <Box component="img" src={seniorCaucusPromImage} alt="Stuy senior caucus prom" className="home-title-image" />
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
                        the night of <AnimatedHighlight>nights</AnimatedHighlight>.
                    </Typography>
                </motion.div>
          </Box>
          <ScrollDownIndicator />
        </Box>
        <Container sx={{ textAlign: 'center', py: 8 }}>
          <Box
            component="img"
            src={workInProgressImage}
            alt="Work in Progress"
            sx={{
              display: 'block',
              margin: '0 auto',
              maxWidth: '100%',
              height: 'auto',
              maxHeight: '600px',
              mb: 4 
            }}
          />
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#322343' }}>
            Coming Soon!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            We're hard at work planning an unforgettable prom experience. Check back later for more details!
          </Typography>
        </Container>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default Prom;