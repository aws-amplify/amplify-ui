import { createTheme } from '@aws-amplify/ui';
import {
  getConsecutiveIntArray,
  strHasLength,
  classNameModifier,
  classNameModifierByFlag,
  getCSSVariableIfValueIsThemeKey,
  Modifiers,
} from '../utils';
import { ComponentClassNames } from '../constants';

const theme = createTheme();
const { tokens } = theme;

describe('getConsecutiveIntArray: ', () => {
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

describe('strHasLength: ', () => {
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

describe('classNameModifier', () => {
  const modifiedClassName = 'amplify-alert--modified';
  const myClass = ComponentClassNames['Alert'];
  const modifier = 'modified';

  it('should return the modified className with a modifier passed in', () => {
    expect(classNameModifier(myClass, modifier)).toEqual(modifiedClassName);
  });

  it('should return empty string without a modifier passed in', () => {
    // force undefined to be Modifiers type for exhaustive edge case test
    expect(
      classNameModifier(myClass, undefined as unknown as Modifiers)
    ).toEqual('');
  });
});

describe('classNameModifierByFlag', () => {
  const modifiedClassName = 'amplify-alert--modified';
  const myClass = ComponentClassNames['Alert'];
  const modifier = 'modified';

  it('should return the modified className with a true flag value passed in', () => {
    expect(classNameModifierByFlag(myClass, modifier, true)).toEqual(
      modifiedClassName
    );
  });

  it('should return empty string with a false flag value passed in', () => {
    expect(classNameModifierByFlag(myClass, modifier, false)).toEqual('');
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
