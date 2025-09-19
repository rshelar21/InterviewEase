import { Interview } from '@/types';

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

export const toSeconds = (duration: string) => {
  const [mm, ss] = duration.split(':').map(Number);
  return mm * 60 + ss;
};

export const avgDurationInSeconds = (data: Partial<Interview>[]) => {
  const totalTime =
    data.reduce((acc, cur) => acc + toSeconds(cur?.duration || '00:00'), 0) /
    data.length;

  const avgDurationInMinutes = Math.round(totalTime / 60);

  return avgDurationInMinutes || 0;
};
