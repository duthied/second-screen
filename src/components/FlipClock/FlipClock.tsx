import React from 'react';
import FlipDigit from './FlipDigit';
import { useTime } from '../../hooks/useTime';
import { formatTime } from '../../utils/formatTime';
import './FlipClock.css';

const FlipClock: React.FC = () => {
  const time = useTime();
  const { hours, minutes, seconds } = formatTime(time);

  return (
    <div className="flip-clock">
      <div className="flip-clock-group">
        <FlipDigit value={hours[0]} />
        <FlipDigit value={hours[1]} />
      </div>
      <div className="flip-clock-separator">:</div>
      <div className="flip-clock-group">
        <FlipDigit value={minutes[0]} />
        <FlipDigit value={minutes[1]} />
      </div>
      <div className="flip-clock-separator">:</div>
      <div className="flip-clock-group">
        <FlipDigit value={seconds[0]} />
        <FlipDigit value={seconds[1]} />
      </div>
    </div>
  );
};

export default FlipClock;
