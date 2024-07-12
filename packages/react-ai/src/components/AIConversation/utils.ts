import { ImageContent } from './types';

export function formatDate(date: Date): string {
  const dateString = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const timeString = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return `${dateString} at ${timeString}`;
}

export function convertBufferToBase64(
  buffer: ArrayBuffer,
  format: ImageContent['format']
): string {
  const base64string = Buffer.from(new Uint8Array(buffer)).toString('base64');
  return `data:image/${format};base64,${base64string}`;
}
