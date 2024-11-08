import { getFileTypeDisplayValue } from '../getFileTypeDisplayValue';

describe('getFileTypeDisplayValue', () => {
  it('should return the file extension', () => {
    expect(getFileTypeDisplayValue('document.pdf')).toBe('pdf');
    expect(getFileTypeDisplayValue('image.jpg')).toBe('jpg');
    expect(getFileTypeDisplayValue('script.ts')).toBe('ts');
  });

  it('should return an empty string for files without extension', () => {
    expect(getFileTypeDisplayValue('README')).toBe('');
  });
});
