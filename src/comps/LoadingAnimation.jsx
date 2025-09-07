import React, { useState, useEffect } from 'react';
import './LoadingAnimation.css';

const LoadingAnimation = ({ onAnimationComplete }) => {
  const [phase, setPhase] = useState('dot');
  useEffect(() => {
    const dotToLineAcrossScreenTimer = setTimeout(() => {
      setPhase('lineAcrossScreen');
    }, 700);
    const lineToCircleTimer = setTimeout(() => {
      setPhase('circle');
    }, 1800);
    const circleToAbstractTransitionTimer = setTimeout(() => {
      setPhase('abstractTransition');
    }, 2000);
    const animationCompleteTimer = setTimeout(() => {
      setPhase('complete');
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }, 3700);
    return () => {
      clearTimeout(dotToLineAcrossScreenTimer);
      clearTimeout(lineToCircleTimer);
      clearTimeout(circleToAbstractTransitionTimer);
      clearTimeout(animationCompleteTimer);
    };
  }, []);

  return (
    <div className={`loading-container ${phase}`}>
      <div className="animation-element"></div>
      <div className="text-container">
        <div className="text stuyvesant-wrapper">
          <div className="text-inner">Stuyvesant</div>
        </div>
        <div className="text senior-caucus-wrapper">
          <div className="text-inner">Senior Caucus</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
