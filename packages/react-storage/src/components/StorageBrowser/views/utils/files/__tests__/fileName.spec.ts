import { getFileName } from '../fileName';

describe('getFileName', () => {
  it('extracts filename from path with forward slashes', () => {
    expect(getFileName('folder/subfolder/image.jpg')).toBe('image.jpg');
  });

  it('returns original string when no slashes present', () => {
    expect(getFileName('image.jpg')).toBe('image.jpg');
  });

  it('handles empty string', () => {
    expect(getFileName('')).toBe('');
  });

  it('handles null', () => {
    expect(getFileName(null)).toBe('');
  });

  it('handles undefined', () => {
    expect(getFileName(undefined)).toBe('');
  });

  it('handles path ending with slash', () => {
    expect(getFileName('folder/subfolder/')).toBe('');
  });

  it('handles single character filename', () => {
    expect(getFileName('folder/a')).toBe('a');
  });
});
