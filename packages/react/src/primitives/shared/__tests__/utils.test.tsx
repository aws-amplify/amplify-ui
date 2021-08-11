import {
  convertStylePropsToStyleObj,
  getNonStyleProps,
  getConsecutiveIntArray,
  strHasLength,
} from '../utils';
import { ComponentPropsToStylePropsMap, ViewProps } from '../../types';

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

describe('convertStylePropsToStyleObj: ', () => {
  it('should convert style props to a style object', () => {
    const style = convertStylePropsToStyleObj(props);
    Object.keys(ComponentPropsToStylePropsMap).forEach((prop) => {
      expect(style[prop]).toBe(props[prop]);
    });
    expect(style['as']).toBeUndefined();
  });

  it('should ignore undefined, null or empty string style prop values', () => {
    const props: ViewProps = {
      backgroundColor: undefined,
      color: null,
      border: '',
      borderRadius: '6px',
      ariaLabel: 'important section',
      as: 'section',
    };
    const style = convertStylePropsToStyleObj(props);

    expect(style['backgroundColor']).toBeUndefined();
    expect(style['color']).toBeUndefined();
    expect(style['border']).toBeUndefined();
    expect(style['borderRadius']).toBe(props.borderRadius);
    expect(style['as']).toBeUndefined();
  });

  it('should extend the passed in style object', () => {
    const props: ViewProps = {
      backgroundColor: 'red',
    };
    const existingStyles: React.CSSProperties = {
      color: 'blue',
    };
    const style = convertStylePropsToStyleObj(props, existingStyles);

    expect(style['backgroundColor']).toBe('red');
    expect(style['color']).toBe('blue');
  });

  it('should give precedence to the stylistic props over the passed in style object', () => {
    const props: ViewProps = {
      color: 'red',
      fontWeight: 'bold',
    };
    const existingStyles: React.CSSProperties = {
      color: 'blue',
      backgroundColor: 'yellow',
    };

    const style = convertStylePropsToStyleObj(props, existingStyles);

    expect(style['backgroundColor']).toBe('yellow');
    expect(style['color']).toBe('red');
    expect(style['fontWeight']).toBe('bold');
  });
});

describe('getNonStyleProps: ', () => {
  it('should return an object containing only the non style props', () => {
    const nonStyleProps = getNonStyleProps(props);
    expect(nonStyleProps['border']).toBeUndefined();
    expect(nonStyleProps['as']).toBe(props.as);
    expect(nonStyleProps['ariaLabel']).toBe(props.ariaLabel);
    expect(nonStyleProps['className']).toBe(props.className);
  });

  it('should return an empty object if only style props are passed in', () => {
    const allStyleProps = {
      color: 'red',
      backgroundColor: 'blue',
      fontWeight: 'bold',
    };
    const nonStyleProps = getNonStyleProps(allStyleProps);
    expect(nonStyleProps).toEqual({});
  });

  it('should return a copy of the original object if all non style props are passed in', () => {
    const noStyleProps = {
      ['data-variation']: 'primary',
      ariaLabel: props.ariaLabel,
      as: props.as,
    };
    const nonStyleProps = getNonStyleProps(noStyleProps);
    expect(nonStyleProps).toEqual(noStyleProps);
    expect(nonStyleProps).not.toBe(noStyleProps);
  });
});

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
