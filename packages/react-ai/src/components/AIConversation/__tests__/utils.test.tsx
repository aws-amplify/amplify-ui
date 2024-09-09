import {
  convertBufferToBase64,
  formatDate,
  getImageTypeFromMimeType,
} from '../utils';

describe('convertBufferToBase64', () => {
  it('should convert an ArrayBuffer to a base64 string with the correct format', () => {
    const { buffer } = new Uint8Array([72, 101, 108, 108, 111]);
    const format = 'png';
    const base64String = convertBufferToBase64(buffer, format);
    expect(base64String).toBe('data:image/png;base64,SGVsbG8=');
  });

  it('should handle empty buffers correctly', () => {
    const buffer = new ArrayBuffer(0);
    const format = 'jpeg';
    const base64String = convertBufferToBase64(buffer, format);
    expect(base64String).toBe('data:image/jpeg;base64,');
  });

  it('should convert an ArrayBuffer with different content correctly', () => {
    const { buffer } = new Uint8Array([255, 0, 255, 0]);
    const format = 'gif';
    const base64String = convertBufferToBase64(buffer, format);
    expect(base64String).toBe('data:image/gif;base64,/wD/AA==');
  });

  it('should still work in node based Buffer is not defined', () => {
    (window.Buffer as any) = undefined;
    const { buffer } = new Uint8Array([72, 101, 108, 108, 111]);
    const format = 'png';
    const base64String = convertBufferToBase64(buffer, format);
    expect(base64String).toBe('data:image/png;base64,SGVsbG8=');
  });
});

describe('formatDate', () => {
  it('should format the date correctly', () => {
    const date = new Date('2024-07-15T15:23:00');
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('Mon, Jul 15 at 3:23 PM');
  });

  it('should handle different dates and times correctly', () => {
    const date = new Date('1999-08-20T03:10:59');
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('Fri, Aug 20 at 3:10 AM');
  });
});

describe('getImageTypeFromMimeType', () => {
  it('should return the image type', () => {
    expect(getImageTypeFromMimeType('image/jpeg')).toBe('jpeg');
    expect(getImageTypeFromMimeType('image/gif')).toBe('gif');
    expect(getImageTypeFromMimeType('image/png')).toBe('png');
    expect(getImageTypeFromMimeType('image/webp')).toBe('webp');
  });
});
