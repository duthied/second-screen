import React from 'react';
import Grid from './components/Layout/Grid';
import FlipClock from './components/FlipClock/FlipClock';
import Weather from './components/Weather/Weather';
import Placeholder from './components/Placeholder/Placeholder';
import './App.css';

function App() {
  return (
    <div className="App">
      <Grid
        clock={<FlipClock />}
        weather={<Weather />}
        placeholder={<Placeholder />}
      />
    </div>
  );
}

export default App;
