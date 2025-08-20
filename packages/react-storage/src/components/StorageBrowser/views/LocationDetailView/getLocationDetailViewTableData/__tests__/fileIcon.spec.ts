import { getFileThumbnail } from '../fileIcon';

describe('getFileThumbnail', () => {
  it('returns generic icon for files without extension', () => {
    expect(getFileThumbnail('README')).toBe('file');
    expect(getFileThumbnail(undefined)).toBe('file');
    expect(getFileThumbnail('')).toBe('file');
  });

  it('returns specific icon for known extensions', () => {
    expect(getFileThumbnail('document.pdf')).toBe('file-pdf');
    expect(getFileThumbnail('image.jpg')).toBe('file-image');
    expect(getFileThumbnail('video.mp4')).toBe('file-video');
    expect(getFileThumbnail('text.txt')).toBe('file-text');
  });

  it('returns generic icon for unknown extensions', () => {
    expect(getFileThumbnail('file.unknown')).toBe('file');
    expect(getFileThumbnail('file.xyz')).toBe('file');
  });
});
