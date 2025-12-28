import React, { useState } from 'react';
import { useInterval } from '../../hooks/useInterval';
import './Quote.css';

const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs"
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb"
  },
  {
    text: "What we think, we become.",
    author: "Buddha"
  },
  {
    text: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu"
  },
  {
    text: "You have power over your mind - not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius"
  },
  {
    text: "The obstacle is the way.",
    author: "Marcus Aurelius"
  },
  {
    text: "We suffer more often in imagination than in reality.",
    author: "Seneca"
  },
  {
    text: "It's not what happens to you, but how you react to it that matters.",
    author: "Epictetus"
  },
  {
    text: "He who fears death will never do anything worth of a man who is alive.",
    author: "Seneca"
  }
];

const THIRTY_MINUTES = 30 * 60 * 1000;

const Quote: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const cycleQuote = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
      setFade(true);
    }, 500);
  };

  useInterval(() => {
    cycleQuote();
  }, THIRTY_MINUTES);

  const currentQuote = quotes[currentIndex];

  return (
    <div className="quote-container">
      <div className={`quote ${fade ? 'fade-in' : 'fade-out'}`}>
        <div className="quote-text">"{currentQuote.text}"</div>
        <div className="quote-author">— {currentQuote.author}</div>
      </div>
    </div>
  );
};

export default Quote;
