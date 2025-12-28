import { WeatherData } from '../components/Weather/types';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const LATITUDE = process.env.REACT_APP_LATITUDE;
const LONGITUDE = process.env.REACT_APP_LONGITUDE;

export async function fetchWeather(): Promise<WeatherData> {
  if (!API_KEY) {
    throw new Error('Weather API key not configured. Please set REACT_APP_WEATHER_API_KEY in .env.local');
  }

  if (!LATITUDE || !LONGITUDE) {
    throw new Error('Location not configured. Please set REACT_APP_LATITUDE and REACT_APP_LONGITUDE in .env.local');
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=metric`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
  }

  const data: WeatherData = await response.json();
  return data;
}
