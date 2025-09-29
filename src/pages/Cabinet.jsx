import React, { useRef } from 'react';
import { Box, Typography, Container, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { KeyboardArrowDown, Instagram, LinkedIn, Email } from '@mui/icons-material';
import Navbar from '../comps/Navbar';
import Footer from '../comps/Footer';
import CabinetData from '../data/cabinet.json';
import seniorCaucusCabinetImage from '../../images/senior_caucus_cabinet.png';
import waveBackground from '../../images/background_1.png';
import { AnimatedHighlight } from '../comps/Highlight';
import cabinetImages from '../data/cabinetImageData';

const PageWrapper = styled(Box)({
  background: '#fff2e2',
  backgroundImage: `url(${waveBackground})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  minHeight: '100vh',
  overflowX: 'hidden',
});

const HeroSection = styled(Box)({
  height: '100vh',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
});

const ScrollIndicator = styled(motion.div)({
  position: 'absolute',
  bottom: '40px',
  left: '49%',
  transform: 'translateX(-50%)',
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', 
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

const TeamSection = styled(Box)({
  position: 'relative',
  padding: '100px 0',
});

const MemberPair = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '120px',
  marginBottom: '120px',
  '@media (min-width: 900px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '80px',
  },
});

const MemberCard = styled(motion.div)({
  position: 'relative',
  borderRadius: '20px',
  background: 'rgba(252, 255, 252, 0.8)',
  border: '1px solid rgba(222, 212, 241, 0.5)',
  boxShadow: '0 8px 32px rgba(108, 95, 131, 0.1)',
  backdropFilter: 'blur(10px)',
});

const ImageContainer = styled(Box)({
  position: 'relative',
  height: '550px',
  overflow: 'hidden',
  borderRadius: '20px 20px 0 0',
});

const MemberImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center 30%',
});

const RoleBadge = styled(Box)({
  position: 'absolute',
  top: '20px',
  right: '20px',
  padding: '8px 16px',
  background: 'rgba(50, 35, 67, 0.8)',
  color: '#fff2e2',
  backdropFilter: 'blur(5px)',
  borderRadius: '30px',
  zIndex: 2,
  fontWeight: 600,
});

const ContentContainer = styled(Box)({ 
  padding: '30px',
  textAlign: 'center',
});

const MemberName = styled(Typography)({
  fontSize: '2.2rem',
  fontWeight: 700,
  color: '#322343',
  marginBottom: '10px',
});

const MemberBio = styled(Typography)({
  fontSize: '1rem',
  lineHeight: 1.7,
  color: '#6c5f83',
});

const SocialLinks = styled(Box)({
  display: 'flex',
  gap: '15px',
  marginTop: '20px',
  justifyContent: 'center',
});

const SocialButton = styled(IconButton)({
  color: '#6c5f83',
  border: '1px solid #ded4f1',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#fff2e2',
    background: '#6c5f83',
  },
});

const Cabinet = () => {
  const { scrollYProgress } = useScroll();
  const heroImageY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const scrollToTeam = () => {
    document.getElementById('team-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const groupedCabinet = CabinetData.reduce((acc, member) => {
    const { role } = member;
    if (!acc[role]) {
      acc[role] = [];
    }
    acc[role].push(member);
    return acc;
  }, {});

  const sliceAnimation = {
    initial: { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
    animate: { clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0% 100%)', transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } },
  };
  
  return (
    <PageWrapper>
      <Navbar />

      <HeroSection>
        <PurpleSlice variants={sliceAnimation} initial="initial" animate="animate" />
        <motion.div 
            style={{ 
                y: heroImageY,
                filter: 'drop-shadow(0 10px 30px rgba(108, 95, 131, 0.2))',
                position: 'relative',
                zIndex: 1,
            }}

            className="home-title-image" 
        >
          <Box
            component="img"
            src={seniorCaucusCabinetImage}
            alt="Senior Caucus Cabinet"
            sx={{
              width: '100%',
              maxWidth: { xs: '400px', md: '750px' },
              height: 'auto',
            }}
          />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity, marginTop: '2rem', position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h2"
              className="section-title stats-title-highlight"
              sx={{
                fontWeight: 400,
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              }}
            >
                This is <AnimatedHighlight>us</AnimatedHighlight>.
            </Typography>
        </motion.div>
        <ScrollIndicator
          style={{ opacity: heroOpacity }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
            <IconButton onClick={scrollToTeam} sx={{ color: '#6c5f83' }}>
                <KeyboardArrowDown fontSize="large" />
            </IconButton>
        </ScrollIndicator>
      </HeroSection>
      
      <TeamSection id="team-section">
        <Container maxWidth="lg">
          {Object.entries(groupedCabinet).map(([role, members]) => (
            <Box key={role} sx={{ mb: 8 }}>
              <Typography variant="h4" sx={{ textAlign: 'center', mb: 4, color: '#322343', fontWeight: 'bold' }}>
                {role}
              </Typography>
              {members.length === 1 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={{ width: '100%', maxWidth: '450px' }}>
                    <MemberCardComponent
                      key={members[0].name}
                      member={members[0]}
                      index={0}
                    />
                  </Box>
                </Box>
              ) : (
                <MemberPair>
                  {members.map((member, memberIndex) => (
                    <MemberCardComponent
                      key={member.name}
                      member={member}
                      index={memberIndex}
                    />
                  ))}
                </MemberPair>
              )}
            </Box>
          ))}
        </Container>
      </TeamSection>
      <Footer />
    </PageWrapper>
  );
};


const MemberCardComponent = ({ member, index }) => {
  const cardRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const isLeftCard = index % 2 === 0;
  
  const yRange = isLeftCard ? [150, -150] : [75, -75];
  const parallaxY = useTransform(scrollYProgress, [0, 1], yRange);

  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  const imageSrc = cabinetImages[member.name];

  return (
    <MemberCard
      ref={cardRef}
      style={{ y: parallaxY }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <ImageContainer>
        <RoleBadge>{member.role}</RoleBadge>
        {imageSrc && <MemberImage src={imageSrc} alt={member.name} />}
      </ImageContainer>
      <ContentContainer>
        <MemberName variant="h3">{member.name}</MemberName>
        <MemberBio>{member.bio}</MemberBio>
        <SocialLinks>
          {member.socials?.instagram && (
            <SocialButton component="a" href={member.socials.instagram} target="_blank" rel="noopener noreferrer">
              <Instagram />
            </SocialButton>
          )}
          {member.socials?.linkedin && (
            <SocialButton component="a" href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedIn />
            </SocialButton>
          )}
          {member.socials?.email && (
            <SocialButton component="a" href={`mailto:${member.socials.email}`}>
              <Email />
            </SocialButton>
          )}
        </SocialLinks>
      </ContentContainer>
    </MemberCard>
  );
};

export default Cabinet;
