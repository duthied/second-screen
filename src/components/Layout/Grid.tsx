import React from 'react';
import './Grid.css';

interface GridProps {
  clock: React.ReactNode;
  weather: React.ReactNode;
  placeholder: React.ReactNode;
}

const Grid: React.FC<GridProps> = ({ clock, weather, placeholder }) => {
  return (
    <div className="grid-container">
      <div className="grid-clock">{clock}</div>
      <div className="grid-bottom">
        <div className="grid-weather">{weather}</div>
        <div className="grid-placeholder">{placeholder}</div>
      </div>
    </div>
  );
};

export default Grid;
