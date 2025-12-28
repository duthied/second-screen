export interface TimeDigits {
  hours: [string, string];
  minutes: [string, string];
  seconds: [string, string];
}

export function formatTime(date: Date): TimeDigits {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return {
    hours: [hours[0], hours[1]],
    minutes: [minutes[0], minutes[1]],
    seconds: [seconds[0], seconds[1]],
  };
}
