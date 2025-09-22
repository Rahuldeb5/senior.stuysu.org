import { Box, Typography, Button, Card, CardContent, Grid, Container } from "@mui/material";
import Navbar from "../comps/Navbar";
import LoadingAnimation from "../comps/LoadingAnimation";
import Footer from "../comps/Footer";
import { useState, useEffect, useRef, useId } from 'react';
import "./Home.css";
import seniorCaucusTitleImage from '../../images/senior_caucus_title.png';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import StarIcon from '@mui/icons-material/Star';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import CelebrationIcon from '@mui/icons-material/Celebration';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useMotionValue, motion, useMotionTemplate, AnimatePresence } from "framer-motion";

export function cn(...inputs) { return twMerge(clsx(inputs)); }
export const HeroHighlight = ({ children, className, containerClassName, }) => { let mouseX = useMotionValue(0); let mouseY = useMotionValue(0); function handleMouseMove({ currentTarget, clientX, clientY, }) { if (!currentTarget) return; let { left, top } = currentTarget.getBoundingClientRect(); mouseX.set(clientX - left); mouseY.set(clientY - top); } return ( <Box className={cn( "relative group", containerClassName )} onMouseMove={handleMouseMove} > <Box className="absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800  pointer-events-none" /> <motion.div className="pointer-events-none bg-dot-thick-indigo-500 dark:bg-dot-thick-indigo-500 absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100" style={{ WebkitMaskImage: useMotionTemplate` radial-gradient( 200px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100% ) `, maskImage: useMotionTemplate` radial-gradient( 200px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100% ) `, }} /> <Box className={cn("relative", className)}>{children}</Box> </Box> ); };
export const Highlight = ({ children, className }) => {
  return (
    <motion.span
      initial={{ backgroundSize: "0% 100%" }}
      whileInView={{ backgroundSize: "100% 100%" }}
      viewport={{ once: true, amount: 0.8 }}     
      transition={{
        duration: 2,
        ease: "linear",
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        `relative inline-block pb-1 px-2 rounded-lg bg-gradient-to-r from-[#b4afd2] to-[#8b7fa6]`,
        className
      )}
    >
      <span className="highlight-text-wrapper">{children}</span>
    </motion.span>
  );
};
export function ContainerTextFlip({ words = ["better", "modern", "beautiful", "awesome"], interval = 2000, className, }) { const [currentWordIndex, setCurrentWordIndex] = useState(0); useEffect(() => { const intervalId = setInterval(() => { setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length); }, interval); return () => clearInterval(intervalId); }, [words, interval]); return ( <Box className={cn("inline-flex items-center", className)}> <Box className="flip-text-container"> <motion.div key={words[currentWordIndex]} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.5, ease: "easeInOut" }} > {words[currentWordIndex]} </motion.div> </Box> </Box> ); }

const Home = () => {
    const [loading, setLoading] = useState(!sessionStorage.getItem('animationPlayed'));
    const [activeSection, setActiveSection] = useState(0);
    const sectionsRef = useRef([]);
    const [quoteVisible, setQuoteVisible] = useState(false);
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const quotes = [
        { text: "Wherever you are, be all there", author: "Jim Elliot" },
        { text: "Be yourself; everyone else is already taken", author: "Oscar Wilde" },
        { text: "The biggest adventure you can take is to live the life of your dreams", author: "Oprah Winfrey" },
        { text: "To live is the rarest thing in the world. Most people exist, that is all", author: "Oscar Wilde" },
        { text: "Life isn't about finding yourself. Life is about creating yourself", author: "George Bernard Shaw" },
    ];

    useEffect(() => {
        const quoteInterval = setInterval(() => {
            setCurrentQuoteIndex(prevIndex => (prevIndex + 1) % quotes.length);
        }, 7000); 
        return () => clearInterval(quoteInterval);
    }, [quotes.length]);

    useEffect(() => {
        if (loading) sessionStorage.setItem('animationPlayed', 'true');
    }, [loading]);

    useEffect(() => {
        if (loading) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.2 });

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach((el) => observer.observe(el));

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = sectionsRef.current.indexOf(entry.target);
                    if (index > -1) setActiveSection(index);
                }
            });
        }, { rootMargin: '-50% 0px -50% 0px' });
        
        sectionsRef.current.forEach(section => {
            if (section) sectionObserver.observe(section);
        });

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setQuoteVisible(true);
                window.removeEventListener('scroll', handleScroll);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            elements.forEach((el) => observer.unobserve(el));
            sectionsRef.current.forEach(section => {
                if (section) sectionObserver.unobserve(section);
            });
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading]);

    const handleAnimationComplete = () => setLoading(false);
    const scrollToSection = (index) => sectionsRef.current[index]?.scrollIntoView({ behavior: 'smooth' });

    const stats = [
        { number: "826", label: "Amazing Seniors", icon: <GroupIcon />, color: "#8b7fa6" },
        { number: "99%", label: "Graduation Rate (2024)", icon: <SchoolIcon />, color: "#9c8fb8" },
        { number: "138", label: "National Merit Semifinalists", icon: <EmojiEventsIcon />, color: "#a89fc5" },
        { number: "100+", label: "Clubs & Activities", icon: <EventIcon />, color: "#b4afd2" }
    ];
    
    const missionData = [
        { title: "Lorem ipsum dolor sit amet", description: "blaH Blah", icon: <Diversity3Icon /> },
        { title: "Create Memories", description: "Organize unforgettable senior events that celebrate our final year together.", icon: <CelebrationIcon /> },
        { title: "Lorem ipsum dolor sit amet", description: "Lorem ipsum dolor sit amet", icon: <SupportAgentIcon /> },
        { title: "Lorem ipsum dolor sit amety", description: "Lorem ipsum dolor sit amet", icon: <WorkspacePremiumIcon /> }
    ];

    const exploreLinks = [
        { title: "Events", description: "See all our upcoming senior activities.", link: "/events" },
        { title: "Cabinet", description: "Meet the students leading the caucus.", link: "/cabinet" },
        { title: "Prom", description: "Get the latest updates on the big night.", link: "/prom" },
        { title: "Resources", description: "Find help for college apps and more.", link: "/resources" },
        { title: "Magazines", description: "Read our latest publications and news.", link: "/magazines" }
    ];

    const flipWords = ["achievements", "milestones", "successes", "victories"];

    return (
        <Box className="home-container">
            {loading && <LoadingAnimation onAnimationComplete={handleAnimationComplete} />}
            {!loading && (
                <>
                    <Navbar />
                    
                    <Box ref={el => sectionsRef.current[0] = el} className="hero-section">
                        <Box className="hero-content-wrapper">
                            <Box component="img" src={seniorCaucusTitleImage} alt="Stuy senior caucus" className="home-title-image" />
                            <AnimatePresence mode="wait">
                                <motion.div key={currentQuoteIndex} className={`hero-quote ${quoteVisible ? 'visible' : ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} >
                                    <FormatQuoteIcon className="quote-icon" />
                                    <Typography variant="h5" className="quote-text"> "{quotes[currentQuoteIndex].text}" </Typography>
                                    <Typography variant="body1" className="quote-author"> — {quotes[currentQuoteIndex].author} </Typography>
                                </motion.div>
                            </AnimatePresence>
                        </Box>
                        <Box className="particles-container">
                            {[...Array(25)].map((_, i) => ( 
                                <Box key={i} className={`particle particle-${i}`}><StarIcon /></Box> 
                            ))}
                        </Box>
                        <Box className="scroll-indicator" onClick={() => scrollToSection(1)}>
                            <Typography variant="body2" sx={{ mb: 1 }}>Discover More</Typography>
                            <ArrowDownwardIcon className="bounce" />
                        </Box>
                    </Box>

                    <Box ref={el => sectionsRef.current[1] = el} className="stats-section">
                        <Container maxWidth="lg">
                            <Box className="section-header animate-on-scroll">
                                <HeroHighlight containerClassName="stats-highlight-container">
                                    <Typography variant="h2" className="section-title stats-title-highlight"> by the <Highlight>numbers</Highlight> </Typography>
                                    <Typography variant="body1" className="section-subtitle"> celebrating our many <ContainerTextFlip words={flipWords} className="stats-flip-text" /> </Typography>
                                </HeroHighlight>
                            </Box>
                            <Grid container spacing={4}>
                                {stats.map((stat, index) => (
                                    <Grid item xs={12} sm={6} md={3} key={index}>
                                        <Card className={`stat-card animate-on-scroll`} style={{ animationDelay: `${index * 0.1}s`, '--accent-color': stat.color }} >
                                            <CardContent>
                                                <Box className="stat-icon-wrapper" style={{ background: stat.color }} > {stat.icon} </Box>
                                                <Typography variant="h3" className="stat-number"> {stat.number} </Typography>
                                                <Typography variant="body1" className="stat-label"> {stat.label} </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    </Box>

                    <Box ref={el => sectionsRef.current[2] = el} className="mission-section">
                        <Container maxWidth="lg">
                            <Box className="section-header animate-on-scroll">
                                <HeroHighlight containerClassName="stats-highlight-container">
                                    <Typography variant="h2" className="section-title stats-title-highlight title-on-dark-bg"> 
                                        our <Highlight>mission</Highlight> 
                                    </Typography>
                                    <Typography variant="body1" className="section-subtitle subtitle-on-dark-bg"> 
                                        for the 2025-2026 school year 
                                    </Typography>
                                </HeroHighlight>
                            </Box>
                            <Grid container spacing={4}>
                                {missionData.map((mission, index) => (
                                    <Grid item xs={12} md={6} key={index}>
                                        <Card className={`mission-card animate-on-scroll`} style={{ animationDelay: `${index * 0.1}s` }}>
                                            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                                <Box className="mission-icon-wrapper">{mission.icon}</Box>
                                                <Box>
                                                    <Typography variant="h5" className="mission-card-title">{mission.title}</Typography>
                                                    <Typography variant="body1" className="mission-card-description">{mission.description}</Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    </Box>
                    
                    <Box ref={el => sectionsRef.current[3] = el} className="explore-section">
                        <Container maxWidth="lg">
                            <Box className="section-header animate-on-scroll">
                                <HeroHighlight containerClassName="stats-highlight-container">
                                    <Typography variant="h2" className="section-title stats-title-highlight">
                                        explore <Highlight>our world</Highlight>
                                    </Typography>
                                    <Typography variant="body1" className="section-subtitle">
                                        but what is Senior Caucus?
                                    </Typography>
                                </HeroHighlight>
                            </Box>
                            <Box className="explore-grid">
                                {exploreLinks.map((item, index) => (
                                    <a href={item.link} key={index} className="explore-card-link">
                                        <Card className={`explore-card animate-on-scroll`} style={{ animationDelay: `${index * 0.1}s` }}>
                                            <CardContent>
                                                <Typography variant="h5" className="explore-card-title">{item.title}</Typography>
                                                <Typography variant="body1" className="explore-card-description">{item.description}</Typography>
                                                <Box className="explore-card-arrow">
                                                    <ArrowForwardIcon />
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </a>
                                ))}
                            </Box>
                        </Container>
                    </Box>

                    <Box className="section-navigation">
                        {[0, 1, 2, 3].map(index => (
                            <Box key={index} className={`nav-dot ${activeSection === index ? 'active' : ''}`} onClick={() => scrollToSection(index)} />
                        ))}
                    </Box>

                    <Footer />
                </>
            )}
        </Box>
    );
}

export default Home;