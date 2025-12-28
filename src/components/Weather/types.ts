export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}

export interface ForecastDay {
  date: string;
  dayName: string;
  temp: number;
  icon: string;
  description: string;
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    dt_txt: string;
  }>;
}

export interface CombinedWeatherData {
  current: WeatherData;
  forecast: ForecastDay[];
}

export interface WeatherState {
  data: CombinedWeatherData | null;
  loading: boolean;
  error: string | null;
}
