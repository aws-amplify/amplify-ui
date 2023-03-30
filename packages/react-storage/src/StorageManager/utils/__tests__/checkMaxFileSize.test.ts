import { checkMaxFileSize } from '../checkMaxFileSize';

const imageFile = new File(['hello'], 'hello.png', { type: 'image/png' });

const getFileSizeErrorText = (sizeText) => `Error over ${sizeText}`;

describe('checkMaxFileSize', () => {
  it('returns empty string if maxFileSize is undefined', () => {
    const message = checkMaxFileSize({
      file: imageFile,
      maxFileSize: undefined,
      getFileSizeErrorText,
    });

    expect(message).toBe('');
  });

  it('returns empty string if file size is under maxFileSize', () => {
    const message = checkMaxFileSize({
      file: imageFile,
      maxFileSize: 6,
      getFileSizeErrorText,
    });

    expect(message).toBe('');
  });

  it('returns correct max error string if file size is over maxFileSize', () => {
    const maxFileSize = 4;
    const message = checkMaxFileSize({
      file: imageFile,
      maxFileSize,
      getFileSizeErrorText,
    });

    expect(message).toBe(`Error over ${maxFileSize} B`);
  });
});
