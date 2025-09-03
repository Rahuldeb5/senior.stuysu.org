import { Box } from "@mui/material";
import Navbar from "../comps/Navbar";
import LoadingAnimation from "../comps/LoadingAnimation";
import { useState, useEffect } from 'react';
import "./Home.css";
import backgroundImage from '../../images/background_1.png';
import seniorCaucusTitleImage from '../../images/senior_caucus_title.png'; 

const Home = () => {
    const [loading, setLoading] = useState(true);

    const handleAnimationComplete = () => {
        console.log('Animation complete, setting loading to false');
        setLoading(false);
    };
    return(
        <Box className="home-container">
            {loading && <LoadingAnimation onAnimationComplete={handleAnimationComplete} />}
            {!loading && (
                <>
                    <Navbar />
                    <img src={seniorCaucusTitleImage} alt="Stuy senior caucus" className="home-title-image" />
                    <Box className="scroll-placeholder">
                        Scroll down to see more content!
                    </Box>
                </>
            )}
        </Box>
    );
}


export default Home;