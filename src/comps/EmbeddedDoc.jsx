import React, { useState } from 'react';
import './EmbeddedDoc.css';

const EmbeddedDoc = ({ title, src }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`doc-item ${isOpen ? 'open' : ''}`}>
      <h3 onClick={toggleOpen}>
        {title}
        <span>{isOpen ? '-' : '+'}</span>
      </h3>
      {isOpen && (
        <div className="doc-iframe-container">
          <iframe
            className="doc-iframe"
            src={src}
            allow="fullscreen"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default EmbeddedDoc;
