import React, { useState } from 'react';
import { useInterval } from '../../hooks/useInterval';
import './Quote.css';

const quotes = [
  { text: "We suffer more often in imagination than in reality.", author: "Seneca" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "What we think, we become.", author: "Buddha" },
  { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
  { text: "You have power over your mind - not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
  { text: "The obstacle is the way.", author: "Marcus Aurelius" },
  { text: "We suffer more often in imagination than in reality.", author: "Seneca" },
  { text: "It's not what happens to you, but how you react to it that matters.", author: "Epictetus" },
  { text: "He who fears death will never do anything worth of a man who is alive.", author: "Seneca" },
  { text: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche" },
  { text: "The mind is everything. What you think you become.", author: "Buddha" },
  { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
  { text: "No man ever steps in the same river twice, for it is not the same river and he is not the same man.", author: "Heraclitus" },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", author: "Ralph Waldo Emerson" },
  { text: "There is nothing either good or bad, but thinking makes it so", author: "William Shakespeare" },
];

const FIVE_MINUTES = 5 * 60 * 1000;

const Quote: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const cycleQuote = () => {
    setFade(false);
    setTimeout(() => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * quotes.length);
      } while (newIndex === currentIndex && quotes.length > 1);
      setCurrentIndex(newIndex);
      setFade(true);
    }, 500);
  };

  useInterval(() => {
    cycleQuote();
  }, FIVE_MINUTES);

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
