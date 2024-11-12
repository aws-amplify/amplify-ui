import { isValidFolderName } from '../utils';

describe('isValidFolderName', () => {
  it('returns false when value is undefined', () => {
    expect(isValidFolderName(undefined)).toBe(false);
  });

  it('returns false when value is an empty string', () => {
    expect(isValidFolderName('')).toBe(false);
  });

  it('returns false if value contains a slash', () => {
    expect(isValidFolderName('Fruit/Kiwi')).toBe(false);
  });

  it('returns false if value contains a period', () => {
    expect(isValidFolderName('Fruit/Kiwi.')).toBe(false);
  });

  it('returns true when value is valid', () => {
    expect(isValidFolderName('Kiwi')).toBe(true);
  });
});
