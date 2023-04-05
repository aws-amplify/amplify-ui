import { filterAllowedFiles } from '../filterAllowedFiles';
const imageFile = new File(['hello'], 'hello.png', { type: 'image/png' });
const docFile = new File(['goodbye'], 'goodbye.doc', {
  type: 'application/msword',
});

describe('filterAllowedFiles', () => {
  it('returns only image files with mimetype image/*', () => {
    const acceptedFileTypes = ['image/*'];
    const acceptedFiles = filterAllowedFiles(
      [imageFile, docFile],
      acceptedFileTypes
    );
    expect(acceptedFiles).toEqual([imageFile]);
  });
  it('returns only doc files', () => {
    const acceptedFileTypes = ['.doc'];
    const acceptedFiles = filterAllowedFiles(
      [imageFile, docFile],
      acceptedFileTypes
    );
    expect(acceptedFiles).toEqual([docFile]);
  });
  it('returns no acceptable files', () => {
    const acceptedFileTypes = ['.xls'];
    const acceptedFiles = filterAllowedFiles(
      [imageFile, docFile],
      acceptedFileTypes
    );
    expect(acceptedFiles).toEqual([]);
  });
});
