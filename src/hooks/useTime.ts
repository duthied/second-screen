import { useState } from 'react';
import { useInterval } from './useInterval';

export function useTime() {
  const [time, setTime] = useState(new Date());

  useInterval(() => {
    setTime(new Date());
  }, 1000);

  return time;
}
