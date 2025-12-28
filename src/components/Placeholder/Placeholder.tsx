import React from 'react';
import './Placeholder.css';

const Placeholder: React.FC = () => {
  return (
    <div className="placeholder">
      <div className="placeholder-content">
        <div className="placeholder-icon">📋</div>
        <div className="placeholder-text">Reserved for future use</div>
      </div>
    </div>
  );
};

export default Placeholder;
