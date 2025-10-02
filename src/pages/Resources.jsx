import React from 'react';
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from 'framer-motion';
import Navbar from "../comps/Navbar";
import Footer from "../comps/Footer";
import EmbeddedDoc from '../comps/EmbeddedDoc';
import ScrollDownIndicator from '../comps/ScrollDownIndicator';
import { AnimatedHighlight } from '../comps/Highlight';
import seniorCaucusResourcesImage from '../../images/senior_caucus_resources.png';
import waveBackground from '../../images/background_1.png';
import "../pages/Home.css";
import "../comps/EmbeddedDoc.css";

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

const docs = [
    {
      title: "Top 50 Colleges List",
      src: "https://docs.google.com/spreadsheets/d/1V7sa5zXdDvT36LwKv0HRba1z9jQhObsLFMgfPIfsNN8/edit?gid=0#gid=0"
    },
    {
      title: "Stuyvesant Alumni Interviews",
      src: "https://docs.google.com/document/d/1l7v4G-XlWr1IoV9nRgKGDZKLmpMoV4r4ohfAoggl7ZE/edit?tab=t.0"
    },
    {
      title: "College App Info by Senior Caucus",
      src: "https://docs.google.com/document/d/1MyPfFSUzYaxQHfpSzT53Cso8vEURJQHBNOcOWuzYznY/edit?tab=t.0#heading=h.8tg2mt2ywwm"
    },
    {
      title: "October College Interviews (2025)",
      src: "https://docs.google.com/document/d/1UBORDo1GSPVMnCOd6Q28lZa9rI79PCKqGq3kNpDIs3o/edit?tab=t.0#heading=h.9nwa1ou8w388"
    }
  ];

const Resources = () => {

    const sliceAnimation = {
        initial: { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
        animate: { clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0% 100%)', transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } },
      };

  return (
    <PageWrapper>
      <Navbar />
      <Box className="Resources">
        <Box className="hero-section">
            <PurpleSlice variants={sliceAnimation} initial="initial" animate="animate" />
          <Box className="hero-content-wrapper">
              <Box component="img" src={seniorCaucusResourcesImage} alt="Stuy senior caucus resources" className="home-title-image" />
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
                    your senior <AnimatedHighlight>stuff</AnimatedHighlight>.
                </Typography>
            </motion.div>
          </Box>
          <ScrollDownIndicator />
        </Box>
        <section className="embedded-docs-section">
            <div className="docs-list">
              {docs.map((doc, index) => (
                  <div key={index} className="doc-item-container">
                      <EmbeddedDoc title={doc.title} src={doc.src} />
                  </div>
              ))}
            </div>
          </section>
      </Box>
      <Footer />
    </PageWrapper>
  );
};

export default Resources;