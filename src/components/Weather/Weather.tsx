import React from 'react';
import { useWeather } from '../../hooks/useWeather';
import './Weather.css';

const Weather: React.FC = () => {
  const { data, loading, error } = useWeather();

  if (loading && !data) {
    return (
      <div className="weather">
        <div className="weather-loading">Loading weather...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather">
        <div className="weather-error">
          <div className="weather-error-icon">⚠️</div>
          <div className="weather-error-message">Unable to load weather</div>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const temp = Math.round(data.main.temp);
  const description = data.weather[0]?.description || 'N/A';
  const icon = data.weather[0]?.icon || '01d';
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  return (
    <div className="weather">
      <div className="weather-icon">
        <img src={iconUrl} alt={description} />
      </div>
      <div className="weather-info">
        <div className="weather-temp">{temp}°C</div>
        <div className="weather-description">{description}</div>
        <div className="weather-location">{data.name}</div>
      </div>
    </div>
  );
};

export default Weather;
