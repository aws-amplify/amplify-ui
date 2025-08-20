import { formatFileSize, resolveMaxFileSize } from '../fileSize';

describe('formatFileSize', () => {
  it('formats bytes correctly', () => {
    expect(formatFileSize(0)).toBe('0 bytes');
    expect(formatFileSize(512)).toBe('512.0 bytes');
    expect(formatFileSize(1024)).toBe('1.0 KB');
    expect(formatFileSize(1536)).toBe('1.5 KB');
    expect(formatFileSize(1048576)).toBe('1.0 MB');
    expect(formatFileSize(1073741824)).toBe('1.0 GB');
  });

  it('handles undefined input', () => {
    expect(formatFileSize(undefined)).toBe('0 bytes');
  });
});

describe('resolveMaxFileSize', () => {
  it('returns number when maxFileSize is number', () => {
    expect(resolveMaxFileSize(5000, 'image')).toBe(5000);
  });

  it('calls function resolver and returns result', () => {
    const resolver = jest.fn().mockReturnValue(3000);
    expect(resolveMaxFileSize(resolver, 'video')).toBe(3000);
    expect(resolver).toHaveBeenCalledWith('video');
  });

  it('returns default when function resolver returns non-number', () => {
    const resolver = jest.fn().mockReturnValue('invalid');
    const result = resolveMaxFileSize(resolver, 'text');
    expect(result).toBeGreaterThan(0);
  });

  it('returns default when function resolver throws', () => {
    const resolver = jest.fn().mockImplementation(() => {
      throw new Error('Test error');
    });
    const result = resolveMaxFileSize(resolver, 'image');
    expect(result).toBeGreaterThan(0);
  });

  it('returns default when maxFileSize is undefined', () => {
    const result = resolveMaxFileSize(undefined, 'image');
    expect(result).toBeGreaterThan(0);
  });
});
