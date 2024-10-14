import { isFile } from '../utils';

describe('view utils', () => {
  it('uses isFile util to discern between files and folders', () => {
    const file = new File(['file contents'], 'test file', {
      type: 'text/plain',
    });
    const folder = new File([], 'test folder');

    expect(isFile(file)).toBe(true);
    expect(isFile(folder)).toBe(false);
  });
});
