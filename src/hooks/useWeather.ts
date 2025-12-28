import { useState, useEffect, useCallback } from 'react';
import { WeatherState } from '../components/Weather/types';
import { fetchWeather } from '../services/weatherApi';
import { useInterval } from './useInterval';

const THIRTY_MINUTES = 30 * 60 * 1000;

export function useWeather(): WeatherState {
  const [state, setState] = useState<WeatherState>({
    data: null,
    loading: true,
    error: null,
  });

  const loadWeather = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const data = await fetchWeather();
      setState({ data, loading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch weather';
      setState({ data: null, loading: false, error: errorMessage });
    }
  }, []);

  // Load weather on mount
  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  // Refresh every 30 minutes
  useInterval(() => {
    loadWeather();
  }, THIRTY_MINUTES);

  return state;
}
