import { renderHook } from '@testing-library/react-hooks';

import { theme } from '@aws-amplify/ui';

import {
  convertGridSpan,
  convertStylePropsToStyleObj,
  getGridSpan,
  useNonStyleProps,
  useTransformStyleProps,
} from '../styleUtils';
import {
  ComponentPropsToStylePropsMap,
  GridItemStyleProps,
  ViewProps,
} from '../../types';
import { Breakpoint } from '../../types/responsive';

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

let breakpoints = theme.breakpoints.values;

const defaultStylePropsParams = {
  breakpoint: 'base' as Breakpoint,
  breakpoints,
};

const gridItemProps = {
  columnSpan: 2,
  rowSpan: 3,
};

describe('convertStylePropsToStyleObj: ', () => {
  it('should convert style props to a style object', () => {
    const style = convertStylePropsToStyleObj({
      props,
      ...defaultStylePropsParams,
    });
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
    const style = convertStylePropsToStyleObj({
      props,
      ...defaultStylePropsParams,
    });

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
    const style = convertStylePropsToStyleObj({
      props,
      style: existingStyles,
      ...defaultStylePropsParams,
    });

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

    const style = convertStylePropsToStyleObj({
      props,
      style: existingStyles,
      ...defaultStylePropsParams,
    });

    expect(style['backgroundColor']).toBe('yellow');
    expect(style['color']).toBe('red');
    expect(style['fontWeight']).toBe('bold');
  });
});

describe('useNonStyleProps: ', () => {
  it('should return an object containing only the non style props', () => {
    const { result } = renderHook(() => useNonStyleProps(props));
    const nonStyleProps = result.current;
    expect(nonStyleProps['border']).toBeUndefined();
    expect(nonStyleProps['as']).toBe(props.as);
    expect(nonStyleProps['ariaLabel']).toBe(props.ariaLabel);
    expect(nonStyleProps['className']).toBe(props.className);
  });

  it('should return an empty object if only style props are passed in', () => {
    const allStyleProps: ViewProps = {
      color: 'red',
      backgroundColor: 'blue',
      fontWeight: 'bold',
    };
    const { result } = renderHook(() => useNonStyleProps(allStyleProps));
    const nonStyleProps = result.current;
    expect(nonStyleProps).toEqual({});
  });

  it('should return a copy of the original object if all non style props are passed in', () => {
    const noStyleProps: ViewProps = {
      ['data-variation']: 'primary',
      ariaLabel: props.ariaLabel,
      as: props.as,
    };
    const { result } = renderHook(() => useNonStyleProps(noStyleProps));
    const nonStyleProps = result.current;
    expect(nonStyleProps).toEqual(noStyleProps);
    expect(nonStyleProps).not.toBe(noStyleProps);
  });
});

describe('convertGridSpan: ', () => {
  it('should return correct css value when passed valid number', () => {
    const param = 5;
    const result = convertGridSpan(param);
    expect(result).toBe(`span ${param} / span ${param}`);
  });

  it('should return correct css value when passed "auto"', () => {
    const param = 'auto';
    const result = convertGridSpan(param);
    expect(result).toBe(param);
  });

  it('should return null when passed undefined or null', () => {
    const unDefResult = convertGridSpan(undefined);
    const nullResult = convertGridSpan(null);
    expect(unDefResult).toBe(null);
    expect(nullResult).toBe(null);
  });

  it('should return object with transform when passed object', () => {
    const param = {
      base: 1,
      large: 2,
    };
    const result = convertGridSpan(param);

    expect(result).toEqual({
      base: getGridSpan(1),
      large: getGridSpan(2),
    });
  });

  it('should return array with transform when passed array', () => {
    const param = [1, 2];
    const result = convertGridSpan(param);

    expect(result).toEqual([getGridSpan(1), getGridSpan(2)]);
  });
});

describe('getGridSpan: ', () => {
  it('should return auto when passed auto', () => {
    const param = 'auto';
    const result = getGridSpan(param);
    expect(result).toBe(param);
  });
  it('should return correct css value when passed valid number', () => {
    const param = 5;
    const result = getGridSpan(param);
    expect(result).toBe(`span ${param} / span ${param}`);
  });
});

describe('useTransformStyleProps', () => {
  it('should transform rowSpan and columnSpan to row and column props', () => {
    const { result } = renderHook(() => useTransformStyleProps(gridItemProps));
    const transformedProps = result.current;
    expect(transformedProps).toHaveProperty(
      'row',
      getGridSpan(gridItemProps.rowSpan)
    );
    expect(transformedProps).toHaveProperty(
      'column',
      getGridSpan(gridItemProps.columnSpan)
    );
  });
});
