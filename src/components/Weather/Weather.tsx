import React from 'react';
import { useWeather } from '../../hooks/useWeather';
import './Weather.css';

const getWeatherIconSVG = (iconCode: string): string => {
  const iconMap: { [key: string]: string } = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️',
  };
  return iconMap[iconCode] || '☁️';
};

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

  const temp = Math.round(data.current.main.temp);
  const description = data.current.weather[0]?.description || 'N/A';

  return (
    <div className="weather">
      <div className="weather-current">
        <div className="weather-temp-large">{temp}°C</div>
        <div className="weather-description">{description}</div>
        <div className="weather-location">{data.current.name}</div>
      </div>

      <div className="weather-divider"></div>

      <div className="weather-forecast">
        {data.forecast.map((day) => (
          <div key={day.date} className="forecast-day">
            <div className="forecast-day-name">{day.dayName}</div>
            <div className="forecast-icon">{getWeatherIconSVG(day.icon)}</div>
            <div className="forecast-temp">{day.temp}°</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Weather;
