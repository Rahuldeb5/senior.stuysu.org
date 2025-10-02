import React, { useState, useEffect } from 'react';
import './CustomCursor.css';
import { useLocation } from 'react-router-dom';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target;
      if (target.closest('a, button, [role="button"], [onClick]')) {
        if (!hover) {
          setHover(true);
        }
      } else {
        if (hover) {
          setHover(false);
        }
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hover]);
  return (
    <div
      className={`custom-cursor ${hover ? 'hover' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
};

export default CustomCursor;