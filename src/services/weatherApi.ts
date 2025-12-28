import { WeatherData, ForecastData, ForecastDay, CombinedWeatherData } from '../components/Weather/types';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const LATITUDE = process.env.REACT_APP_LATITUDE;
const LONGITUDE = process.env.REACT_APP_LONGITUDE;

function getDayName(timestamp: number): string {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const date = new Date(timestamp * 1000);
  return days[date.getDay()];
}

function processForecast(forecastData: ForecastData): ForecastDay[] {
  const dailyForecasts: { [key: string]: any } = {};

  forecastData.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toISOString().split('T')[0];

    if (!dailyForecasts[dateKey]) {
      dailyForecasts[dateKey] = {
        date: dateKey,
        dayName: getDayName(item.dt),
        temps: [],
        icons: [],
        descriptions: [],
      };
    }

    dailyForecasts[dateKey].temps.push(item.main.temp);
    dailyForecasts[dateKey].icons.push(item.weather[0].icon);
    dailyForecasts[dateKey].descriptions.push(item.weather[0].description);
  });

  const forecastDays: ForecastDay[] = Object.values(dailyForecasts)
    .slice(1, 4)
    .map((day: any) => ({
      date: day.date,
      dayName: day.dayName,
      temp: Math.round(day.temps.reduce((a: number, b: number) => a + b) / day.temps.length),
      icon: day.icons[Math.floor(day.icons.length / 2)],
      description: day.descriptions[0],
    }));

  return forecastDays;
}

export async function fetchWeather(): Promise<CombinedWeatherData> {
  if (!API_KEY) {
    throw new Error('Weather API key not configured. Please set REACT_APP_WEATHER_API_KEY in .env.local');
  }

  if (!LATITUDE || !LONGITUDE) {
    throw new Error('Location not configured. Please set REACT_APP_LATITUDE and REACT_APP_LONGITUDE in .env.local');
  }

  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=metric`;

  const [currentResponse, forecastResponse] = await Promise.all([
    fetch(currentUrl),
    fetch(forecastUrl),
  ]);

  if (!currentResponse.ok) {
    throw new Error(`Weather API error: ${currentResponse.status} ${currentResponse.statusText}`);
  }

  if (!forecastResponse.ok) {
    throw new Error(`Forecast API error: ${forecastResponse.status} ${forecastResponse.statusText}`);
  }

  const currentData: WeatherData = await currentResponse.json();
  const forecastData: ForecastData = await forecastResponse.json();

  return {
    current: currentData,
    forecast: processForecast(forecastData),
  };
}
