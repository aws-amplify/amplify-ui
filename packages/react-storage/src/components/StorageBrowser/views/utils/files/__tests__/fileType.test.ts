import {
  isGenericContentType,
  getFileTypeFromContentType,
  getFileExtension,
  getFileTypeFromExtension,
  determineFileType,
} from '../fileType';
import type { FileData } from '../../../../actions';

describe('isGenericContentType', () => {
  it('returns true for generic content types', () => {
    expect(isGenericContentType('application/octet-stream')).toBe(true);
    expect(isGenericContentType('binary/octet-stream')).toBe(true);
  });

  it('returns true for undefined or invalid content types', () => {
    expect(isGenericContentType(undefined)).toBe(true);
    expect(isGenericContentType('')).toBe(true);
  });

  it('returns false for specific content types', () => {
    expect(isGenericContentType('image/jpeg')).toBe(false);
    expect(isGenericContentType('text/plain')).toBe(false);
  });
});

describe('getFileTypeFromContentType', () => {
  it('returns correct file types for content types', () => {
    expect(getFileTypeFromContentType('image/jpeg')).toBe('image');
    expect(getFileTypeFromContentType('video/mp4')).toBe('video');
    expect(getFileTypeFromContentType('text/plain')).toBe('text');
    expect(getFileTypeFromContentType('application/json')).toBe('text');
  });

  it('returns null for unknown content types', () => {
    expect(getFileTypeFromContentType('application/pdf')).toBe(null);
    expect(getFileTypeFromContentType(undefined)).toBe(null);
  });
});

describe('getFileExtension', () => {
  it('extracts file extensions correctly', () => {
    expect(getFileExtension('file.jpg')).toBe('jpg');
    expect(getFileExtension('path/to/file.txt')).toBe('txt');
    expect(getFileExtension('file.tar.gz')).toBe('gz');
  });

  it('returns null for files without extensions', () => {
    expect(getFileExtension('README')).toBe(null);
    expect(getFileExtension('file.')).toBe(null);
    expect(getFileExtension(undefined)).toBe(null);
  });
});

describe('getFileTypeFromExtension', () => {
  it('returns correct file types for extensions', () => {
    expect(getFileTypeFromExtension('jpg')).toBe('image');
    expect(getFileTypeFromExtension('mp4')).toBe('video');
    expect(getFileTypeFromExtension('txt')).toBe('text');
  });

  it('returns null for unknown extensions', () => {
    expect(getFileTypeFromExtension('unknown')).toBe(null);
    expect(getFileTypeFromExtension(undefined)).toBe(null);
  });
});

describe('determineFileType', () => {
  const mockFileData: FileData = {
    key: 'test.jpg',
    contentType: 'image/jpeg',
    size: 1024,
    type: 'FILE',
    id: 'test-id',
    lastModified: new Date(),
  };

  it('uses custom resolver when provided', () => {
    const resolver = jest.fn().mockReturnValue('custom');
    const result = determineFileType({
      fileData: mockFileData,
      fileTypeResolver: resolver,
    });

    expect(result).toBe('custom');
    expect(resolver).toHaveBeenCalledWith(mockFileData);
  });

  it('falls back to content type when resolver returns undefined', () => {
    const resolver = jest.fn().mockReturnValue(undefined);
    const result = determineFileType({
      fileData: mockFileData,
      fileTypeResolver: resolver,
    });

    expect(result).toBe('image');
  });

  it('uses content type when no resolver provided', () => {
    const result = determineFileType({ fileData: mockFileData });
    expect(result).toBe('image');
  });

  it('falls back to extension when content type is generic', () => {
    const fileData = {
      ...mockFileData,
      contentType: 'application/octet-stream',
    };

    const result = determineFileType({ fileData });
    expect(result).toBe('image'); // from .jpg extension
  });

  it('handles resolver errors gracefully', () => {
    const resolver = jest.fn().mockImplementation(() => {
      throw new Error('Test error');
    });

    const result = determineFileType({
      fileData: mockFileData,
      fileTypeResolver: resolver,
    });

    expect(result).toBe('image');
  });

  it('returns null when no type can be determined', () => {
    const fileData: FileData = {
      key: 'unknown',
      contentType: 'application/octet-stream',
      size: 1024,
      type: 'FILE',
      id: 'test-id',
      lastModified: new Date(),
    };

    const result = determineFileType({ fileData });
    expect(result).toBe(null);
  });
});
