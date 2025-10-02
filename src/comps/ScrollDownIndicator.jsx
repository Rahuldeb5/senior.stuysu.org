import React from 'react';
import { motion } from 'framer-motion';
import { IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled } from '@mui/material/styles';

const ScrollIndicator = styled(motion.div)({
  position: 'absolute',
  bottom: '40px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10,
  color: '#322343',
  cursor: 'pointer',
});

const ScrollDownIndicator = () => {
  const scrollDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.8, left: 0, behavior: 'smooth' });
  };

  return (
    <ScrollIndicator
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <IconButton onClick={scrollDown} sx={{ color: 'inherit' }}>
        <KeyboardArrowDownIcon fontSize="large" />
      </IconButton>
    </ScrollIndicator>
  );
};

export default ScrollDownIndicator;
