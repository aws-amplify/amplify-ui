import {
  convertStylePropsToStyleObj,
  getNonStyleProps,
  getConsecutiveIntArray,
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
});

describe('getNonStyleProps: ', () => {
  it('should remove style props, leaving other props', () => {
    const nonStyleProps = getNonStyleProps(props);
    expect(nonStyleProps['border']).toBeUndefined();
    expect(nonStyleProps['as']).toBe(props.as);
    expect(nonStyleProps['ariaLabel']).toBe(props.ariaLabel);
    expect(nonStyleProps['className']).toBe(props.className);
  });
});

describe('getConsecutiveIntArray: ', () => {
  it('should return an array of consecutive integer', () => {
    const array = getConsecutiveIntArray(1, 5);
    expect(array).toEqual([1, 2, 3, 4, 5]);
  });
});
