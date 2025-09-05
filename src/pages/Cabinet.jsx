import { Box, Card, CardMedia, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../comps/Navbar";
import CabinetData from "../data/cabinet.json";
import "./Cabinet.css";

const Cabinet = () => {
  const [headingVisible, setHeadingVisible] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [animatedCards, setAnimatedCards] = useState(new Set());
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [fadeInComplete, setFadeInComplete] = useState(false);
  const cardRefs = useRef([]);
  const scrollTimeoutRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (isInitialLoad) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
      setFadeInComplete(true); 
      setTimeout(() => {
        document.body.style.overflow = 'auto';
      }, 1500); 
    }, 100);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'auto';
      };
    }
  }, [isInitialLoad]);
  useEffect(() => {
    setIsInitialLoad(true);
    setFadeInComplete(false);
  }, [location.pathname]);

  const handleScroll = useCallback(() => {
    if (!fadeInComplete) return; 
  
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
    
  if (scrollY > windowHeight * 0.2) {
    setHeadingVisible(false);
  } else {
    setHeadingVisible(true);
  }
  if (scrollY > windowHeight * 0.5) {
    setContentVisible(true);
  } else {
    setContentVisible(false);
  }
  }, [fadeInComplete]);

  useEffect(() => {
    if (!fadeInComplete) return; 
    const throttledScroll = () => {
      if (scrollTimeoutRef.current) return;
      scrollTimeoutRef.current = setTimeout(() => {
        handleScroll();
        scrollTimeoutRef.current = null;
      }, 16); 
    };
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll, fadeInComplete]);
  useEffect(() => {
    if (!contentVisible) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setAnimatedCards(prev => {
              const newSet = new Set(prev);
              newSet.add(index);
              return newSet;
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );
    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, [contentVisible]);
  return (
    <Box className="cabinet">
      <Navbar />
      <Box className={`fade-in-overlay ${fadeInComplete ? 'fade-out' : ''}`} />
      <Box className={`cabinet-heading-container ${!headingVisible ? 'fade-out' : ''} ${fadeInComplete ? 'fade-in-complete' : ''}`}>
        <Typography className="cabinet-heading">
          OUR CABINET
        </Typography>
      </Box>
      <Box className={`cabinet-content ${contentVisible ? 'show' : ''}`}>
        {CabinetData.map((e, index) => (
          <Box 
            className={`cabinet-member ${animatedCards.has(index) ? 'slide-in' : ''}`}
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            data-index={index}
          >
            <Box
              className="member-section"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: index % 2 === 0 ? "row" : "row-reverse" }
              }}
            >
              <Card className="img-card">
                <Typography className="member-role">{e.role}</Typography>
                <CardMedia component="img" image={e.img} alt={e.name} />
                <Typography className="member-name">{e.name}</Typography>
              </Card>
              <Card className="bio-card">
                <Typography className="bio">{e.bio}</Typography>
              </Card>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default Cabinet;