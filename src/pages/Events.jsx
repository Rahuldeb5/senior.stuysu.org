import { Box, Typography, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Navbar from "../comps/Navbar";
import MyCalendar from "../comps/MyCalendar";
import Footer from "../comps/Footer";
import seniorCaucusEventsImage from '../../images/senior_caucus_events.png';
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

const Events = () => {
  return(
      <PageWrapper className="Events">
          <Navbar />
          <Box className="hero-section">
              <Box className="hero-content-wrapper">
                  <Box component="img" src={seniorCaucusEventsImage} alt="Stuy senior caucus events" className="home-title-image" />
              </Box>
          </Box>
          <Container sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h5" sx={{ color: '#322343', fontWeight: 'bold' }}>
              Check this calendar for upcoming events!
            </Typography>
          </Container>
          <MyCalendar />
          <Footer />
      </PageWrapper>
  );
}

export default Events;