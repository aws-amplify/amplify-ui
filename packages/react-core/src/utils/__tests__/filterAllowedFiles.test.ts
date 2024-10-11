import { filterAllowedFiles } from '../filterAllowedFiles';

describe('filterAllowFiles', () => {
  const droppedFiles = [
    new File([], 'test.jpg', { type: 'image/jpg' }),
    new File([], 'test.png', { type: 'image/png' }),
  ];

  it('should work with * MIME types', () => {
    const { acceptedFiles, rejectedFiles } = filterAllowedFiles(droppedFiles, [
      'image/*',
    ]);
    expect(rejectedFiles).toHaveLength(0);
    expect(acceptedFiles).toHaveLength(2);
  });

  it('should work with extension types', () => {
    const { acceptedFiles, rejectedFiles } = filterAllowedFiles(droppedFiles, [
      '.png',
    ]);
    expect(rejectedFiles).toHaveLength(1);
    expect(acceptedFiles).toHaveLength(1);
  });

  it('should work with *', () => {
    const { acceptedFiles, rejectedFiles } = filterAllowedFiles(droppedFiles, [
      '*',
    ]);
    expect(rejectedFiles).toHaveLength(0);
    expect(acceptedFiles).toHaveLength(2);
  });
});
