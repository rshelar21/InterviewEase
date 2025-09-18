export function formatTimeOnly(dateStr: Date) {
  const d = new Date(dateStr);
  const time = d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return time;
}

export function formatDateOnly(dateStr: Date) {
  const d = new Date(dateStr);
  const day = d.getDate(); // 12
  const month = d.toLocaleString('en-US', { month: 'short' }); // Sept
  const year = d.getFullYear();

  return `${day}, ${month}, ${year}`;
}

export const formatTimer = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
