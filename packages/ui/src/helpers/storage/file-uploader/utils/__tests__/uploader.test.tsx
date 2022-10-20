import { getFileName } from '..';

describe('getFileName', () => {
  it('returns the file name passed in if file name is not an array', () => {
    const file = new File(['test'], '../img/test.jpg', { type: 'image/jpg' });
    const fileName = 'TESTFILENAME';
    const index = 0;
    const result = getFileName(file, fileName, index);
    expect(result).toEqual(fileName);
  });
});
