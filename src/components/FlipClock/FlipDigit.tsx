import React, { useState, useEffect } from 'react';
import './FlipDigit.css';

interface FlipDigitProps {
  value: string;
}

const FlipDigit: React.FC<FlipDigitProps> = ({ value }) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [previousValue, setPreviousValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (value !== currentValue) {
      setPreviousValue(currentValue);
      setIsFlipping(true);

      const timer = setTimeout(() => {
        setCurrentValue(value);
        setIsFlipping(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [value, currentValue]);

  return (
    <div className="flip-digit-container">
      <div className={`flip-digit ${isFlipping ? 'flipping' : ''}`}>
        <div className="flip-digit-top">
          <div className="flip-digit-face">{isFlipping ? previousValue : currentValue}</div>
        </div>
        <div className="flip-digit-bottom">
          <div className="flip-digit-face">{currentValue}</div>
        </div>
        {isFlipping && (
          <div className="flip-digit-back-top">
            <div className="flip-digit-face">{previousValue}</div>
          </div>
        )}
        {isFlipping && (
          <div className="flip-digit-back-bottom">
            <div className="flip-digit-face">{currentValue}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlipDigit;
