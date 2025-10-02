import { Box, Link, Typography } from "@mui/material";
import "./Footer.css";

import LinktreeImage from "../../images/linktree-icon-transparent.png";
import InstagramImage from "../../images/instagram-logo-transparent.png";
import FacebookImage from "../../images/facebook-logo-transparent.png";
import StuyImage from "../../images/stuyvesant-high-school-logo-transparent.png";

const Footer = () => {
    return (
        <Box className="main-footer">
            <Box className="content-wrapper">
                <Box className="info-section">
                    <Box className="brand-header">
                        <Typography variant="h3" className="main-title">Stuyvesant Senior Caucus</Typography>
                        <Typography variant="p" className="info-text location-text">345 Chambers St, Manhattan, NY 10282</Typography>
                    </Box>
                    <Box className="social-links">
                        <Link href="https://linktr.ee/seniorcaucus2026" target="_blank" rel="noopener noreferrer" className="link-item">
                            <Box
                                component="img" 
                                src={LinktreeImage}
                                alt="link-tree" 
                                className="icon-image"
                            />
                        </Link>
                        <Link href="https://www.instagram.com/stuyseniorcaucus/" target="_blank" rel="noopener noreferrer" className="link-item">
                            <Box
                                component="img" 
                                src={InstagramImage}
                                alt="insta" 
                                className="icon-image"
                            />
                        </Link>
                        <Link href="https://www.facebook.com/share/g/1D2kZEi262/" target="_blank" rel="noopener noreferrer" className="link-item">
                            <Box
                                component="img" 
                                src={FacebookImage}
                                alt="FB" 
                                className="icon-image"
                            />
                        </Link>
                    </Box>
                    <Typography variant="p" className="info-text">© Stuyvesant High School 2025-26</Typography>
                </Box>
                <Box className="logo-section">
                    <Link href="https://stuy.enschool.org/" target="_blank" rel="noopener noreferrer" className="link-item">
                        <Box
                            component="img" 
                            src={StuyImage}
                            alt="stuyvesant-high-school" 
                            className="brand-logo"
                        />
                    </Link>
                </Box>
                <Box className="credits-section">
                    <Box className="credits-content">
                        <Typography variant="p" className="footer-text credits-title">Credits:</Typography>
                        <Typography variant="p" className="info-text">Co-Presidents: Vanna Lei & Amy Zhou</Typography>
                        <Typography variant="p" className="info-text">Development Leads: Rahul Deb & Jiewen Huang</Typography>
                        <Typography variant="p" className="info-text">Senior Caucus IT Team:</Typography>
                        <Typography variant="p" className="footer-text team-list"> Ardian Agoes | David Lee | Kalimul Kaif | Kanchanok Zhang (Ting Ting)</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
