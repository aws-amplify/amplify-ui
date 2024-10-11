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
  it('returns all files with undefined filter', () => {
    const acceptedFileTypes = undefined;
    const acceptedFiles = filterAllowedFiles(
      [imageFile, docFile],
      acceptedFileTypes
    );
    expect(acceptedFiles).toEqual([imageFile, docFile]);
  });
  it('returns all files with empty array', () => {
    const acceptedFileTypes: string[] = [];
    const acceptedFiles = filterAllowedFiles(
      [imageFile, docFile],
      acceptedFileTypes
    );
    expect(acceptedFiles).toEqual([imageFile, docFile]);
  });
  it('returns all files with star value in array', () => {
    const acceptedFileTypes = ['*'];
    const acceptedFiles = filterAllowedFiles(
      [imageFile, docFile],
      acceptedFileTypes
    );
    expect(acceptedFiles).toEqual([imageFile, docFile]);
  });
  it('returns all files with star value anywhere in array', () => {
    const acceptedFileTypes = ['.doc', '*', '.xls'];
    const acceptedFiles = filterAllowedFiles(
      [imageFile, docFile],
      acceptedFileTypes
    );
    expect(acceptedFiles).toEqual([imageFile, docFile]);
  });
  it('returns only image with star file specifier', () => {
    const acceptedFileTypes = ['image/*'];
    const acceptedFiles = filterAllowedFiles(
      [imageFile, docFile],
      acceptedFileTypes
    );
    expect(acceptedFiles).toEqual([imageFile]);
  });
});
