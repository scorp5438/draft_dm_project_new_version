export function formatTime(timeString) {
  const [hours, minutes] = timeString.split(':');
  return new Intl.DateTimeFormat([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC'
  }).format(new Date(Date.UTC(1970, 0, 1, hours, minutes)));
}