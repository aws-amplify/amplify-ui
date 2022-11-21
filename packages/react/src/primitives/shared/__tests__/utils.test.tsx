import { ViewProps } from '../../types';
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

const props: ViewProps = {
  backgroundColor: 'blue',
  border: '1px solid black',
  borderRadius: '6px',
  boxShadow: '3px 3px 5px 6px #ccc',
  color: 'red',
  height: '100px',
  maxHeight: '200px',
  maxWidth: '200px',
  minHeight: '100px',
  minWidth: '100px',
  opacity: '80%',
  padding: '6px',
  width: '100px',
  as: 'section',
  ariaLabel: 'important section',
  className: 'my-section',
};

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

  it('should return null without a modifier passed in', () => {
    // force undefined to be Modifiers type for exhaustive edge case test
    expect(
      classNameModifier(myClass, undefined as unknown as Modifiers)
    ).toEqual(null);
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

  it('should return null with a false flag value passed in', () => {
    expect(classNameModifierByFlag(myClass, modifier, false)).toEqual(null);
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
