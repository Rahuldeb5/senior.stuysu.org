import { Box } from "@mui/material";
import Navbar from "../comps/Navbar";
import MyCalendar from "../comps/MyCalendar";
import Footer from "../comps/Footer";
import seniorCaucusEventsImage from '../../images/senior_caucus_events.png';
import "../pages/Home.css";

const Events = () => {
  return(
      <Box className="Events">
          <Navbar />
          <Box className="hero-section">
              <Box className="hero-content-wrapper">
                  <Box component="img" src={seniorCaucusEventsImage} alt="Stuy senior caucus events" className="home-title-image" />
              </Box>
          </Box>
          <MyCalendar />
          <Footer />
      </Box>
  );
}

export default Events;