export interface TimeDigits {
  hours: [string, string];
  minutes: [string, string];
  seconds: [string, string];
  period: 'AM' | 'PM';
}

export function formatTime(date: Date): TimeDigits {
  // Use built-in toLocaleTimeString to get 12-hour format with AM/PM
  const timeString = date.toLocaleTimeString('en-US', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  // Parse the formatted string (e.g., "01:30:45 PM")
  const [time, period] = timeString.split(' ');
  const [hours, minutes, seconds] = time.split(':');

  return {
    hours: [hours[0], hours[1]],
    minutes: [minutes[0], minutes[1]],
    seconds: [seconds[0], seconds[1]],
    period: period as 'AM' | 'PM',
  };
}
