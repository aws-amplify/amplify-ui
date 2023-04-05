import { createTheme } from '@aws-amplify/ui';
import {
  getConsecutiveIntArray,
  strHasLength,
  getCSSVariableIfValueIsThemeKey,
} from '../utils';

const theme = createTheme();
const { tokens } = theme;

describe('getConsecutiveIntArray:', () => {
  it('should return an array of consecutive integer', () => {
    const array = getConsecutiveIntArray(1, 5);
    expect(array).toEqual([1, 2, 3, 4, 5]);
  });

  it('should return an array with a single entry', () => {
    const array = getConsecutiveIntArray(1, 1);
    expect(array).toEqual([1]);
  });

  it('should return an empty array when the starting integer is larger than the ending integer', () => {
    const array = getConsecutiveIntArray(5, 1);
    expect(array).toEqual([]);
  });
});

describe('strHasLength:', () => {
  it('should return false for none string types', () => {
    const noneStringTypes = [undefined, null, 1, true, {}, [], () => {}];
    noneStringTypes.forEach((type) => {
      expect(strHasLength(type)).toBe(false);
    });
  });

  it('should return false for strings with 0 length', () => {
    expect(strHasLength('')).toBe(false);
  });

  it('should return true for strings with a length', () => {
    expect(strHasLength('some string')).toBe(true);
  });
});

describe('getCSSVariableIfValueIsThemeKey', () => {
  it('should return CSS variable if value is a theme key', () => {
    expect(
      getCSSVariableIfValueIsThemeKey('backgroundColor', 'red.10', tokens)
    ).toBe('var(--amplify-colors-red-10)');
  });

  it('should return value directly if it is not a theme key', () => {
    expect(
      getCSSVariableIfValueIsThemeKey('backgroundColor', 'red', tokens)
    ).toBe('red');
  });
});
