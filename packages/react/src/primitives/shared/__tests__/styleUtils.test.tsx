import { renderHook } from '@testing-library/react-hooks';

import { defaultTheme, createTheme } from '@aws-amplify/ui';

import {
  convertGridSpan,
  convertStylePropsToStyleObj,
  getGridSpan,
  splitPrimitiveProps,
  useStyles,
  useTransformStyleProps,
} from '../styleUtils';
import {
  BaseStyleProps,
  ComponentPropsToStylePropsMap,
  FlexContainerStyleProps,
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

let breakpoints = defaultTheme.breakpoints.values;

const defaultStylePropsParams = {
  breakpoint: 'base' as Breakpoint,
  breakpoints,
};

const gridItemProps = {
  columnSpan: 2,
  rowSpan: 3,
};

const theme = createTheme();

describe('convertStylePropsToStyleObj: ', () => {
  it('should convert style props to a style object', () => {
    const { propStyles } = convertStylePropsToStyleObj({
      props,
      ...defaultStylePropsParams,
    });
    Object.keys(ComponentPropsToStylePropsMap).forEach((prop) => {
      expect(propStyles[prop]).toBe(props[prop]);
    });
    expect(propStyles['as']).toBeUndefined();
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
    const { propStyles } = convertStylePropsToStyleObj({
      props,
      ...defaultStylePropsParams,
    });

    expect(propStyles['backgroundColor']).toBeUndefined();
    expect(propStyles['color']).toBeUndefined();
    expect(propStyles['border']).toBeUndefined();
    expect(propStyles['borderRadius']).toBe(props.borderRadius);
    expect(propStyles['as']).toBeUndefined();
  });

  it('should support object or array style prop values', () => {
    const props = {
      backgroundColor: ['red', 'yellow'],
      direction: { base: 'row', large: 'column' },
    };
    const { propStyles: baseStyle } = convertStylePropsToStyleObj({
      props,
      ...defaultStylePropsParams,
    });

    expect(baseStyle[ComponentPropsToStylePropsMap.backgroundColor]).toBe(
      props.backgroundColor[0]
    );
    expect(baseStyle[ComponentPropsToStylePropsMap.direction]).toBe(
      props.direction.base
    );

    const { propStyles: mediumStyle } = convertStylePropsToStyleObj({
      props,
      ...defaultStylePropsParams,
      breakpoint: 'medium',
    });

    expect(mediumStyle[ComponentPropsToStylePropsMap.backgroundColor]).toBe(
      props.backgroundColor[1]
    );
    expect(mediumStyle[ComponentPropsToStylePropsMap.direction]).toBe(
      props.direction.base
    );

    const { propStyles: largeStyle } = convertStylePropsToStyleObj({
      props,
      ...defaultStylePropsParams,
      breakpoint: 'large',
    });

    expect(largeStyle[ComponentPropsToStylePropsMap.backgroundColor]).toBe(
      props.backgroundColor[1]
    );
    expect(largeStyle[ComponentPropsToStylePropsMap.direction]).toBe(
      props.direction.large
    );
  });

  it('should extend the passed in style object', () => {
    const props: ViewProps = {
      backgroundColor: 'red',
    };
    const existingStyles: React.CSSProperties = {
      color: 'blue',
    };
    const { propStyles } = convertStylePropsToStyleObj({
      props,
      style: existingStyles,
      ...defaultStylePropsParams,
    });

    expect(propStyles['backgroundColor']).toBe('red');
    expect(propStyles['color']).toBe('blue');
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

    const { propStyles } = convertStylePropsToStyleObj({
      props,
      style: existingStyles,
      ...defaultStylePropsParams,
    });

    expect(propStyles['backgroundColor']).toBe('yellow');
    expect(propStyles['color']).toBe('red');
    expect(propStyles['fontWeight']).toBe('var(--amplify-font-weights-bold)');
  });

  it('should handle design tokens', () => {
    const props = {
      color: theme.tokens.colors.font.primary,
    };
    const { propStyles } = convertStylePropsToStyleObj({
      props,
      style: {},
      ...defaultStylePropsParams,
    });
    expect(propStyles['color']).toBe('var(--amplify-colors-font-primary)');
  });

  it('should handle responsive design tokens', () => {
    const props = {
      color: [
        theme.tokens.colors.font.primary,
        theme.tokens.colors.font.secondary,
      ],
      backgroundColor: {
        base: theme.tokens.colors.background.primary,
        large: theme.tokens.colors.background.secondary,
      },
    };
    const { propStyles } = convertStylePropsToStyleObj({
      props,
      style: {},
      ...defaultStylePropsParams,
    });
    expect(propStyles['color']).toBe('var(--amplify-colors-font-primary)');
    expect(propStyles['backgroundColor']).toBe(
      'var(--amplify-colors-background-primary)'
    );

    const { propStyles: mediumStyle } = convertStylePropsToStyleObj({
      props,
      ...defaultStylePropsParams,
      breakpoint: 'medium',
    });

    expect(mediumStyle[ComponentPropsToStylePropsMap.color]).toBe(
      'var(--amplify-colors-font-secondary)'
    );
    expect(mediumStyle[ComponentPropsToStylePropsMap.backgroundColor]).toBe(
      'var(--amplify-colors-background-primary)'
    );

    const { propStyles: largeStyle } = convertStylePropsToStyleObj({
      props,
      ...defaultStylePropsParams,
      breakpoint: 'large',
    });
    expect(largeStyle[ComponentPropsToStylePropsMap.color]).toBe(
      'var(--amplify-colors-font-secondary)'
    );
    expect(largeStyle[ComponentPropsToStylePropsMap.backgroundColor]).toBe(
      'var(--amplify-colors-background-secondary)'
    );
  });

  it('should handle a mix of responsive design tokens and raw values', () => {
    const props = {
      color: [theme.tokens.colors.font.primary, 'red'],
      backgroundColor: {
        base: theme.tokens.colors.background.primary,
        large: 'blue',
      },
    };
    const { propStyles } = convertStylePropsToStyleObj({
      props,
      style: {},
      ...defaultStylePropsParams,
    });

    expect(propStyles['color']).toBe('var(--amplify-colors-font-primary)');
    expect(propStyles['backgroundColor']).toBe(
      'var(--amplify-colors-background-primary)'
    );

    const { propStyles: mediumStyle } = convertStylePropsToStyleObj({
      props,
      ...defaultStylePropsParams,
      breakpoint: 'medium',
    });

    expect(mediumStyle[ComponentPropsToStylePropsMap.color]).toBe('red');
    expect(mediumStyle[ComponentPropsToStylePropsMap.backgroundColor]).toBe(
      'var(--amplify-colors-background-primary)'
    );

    const { propStyles: largeStyle } = convertStylePropsToStyleObj({
      props,
      ...defaultStylePropsParams,
      breakpoint: 'large',
    });
    expect(largeStyle[ComponentPropsToStylePropsMap.color]).toBe('red');
    expect(largeStyle[ComponentPropsToStylePropsMap.backgroundColor]).toBe(
      'blue'
    );
  });
});

describe('useStyleProps: ', () => {
  it('should return an object containing only the non style props', () => {
    const {
      result: {
        current: { nonStyleProps },
      },
    } = renderHook(() => useStyles(props, {}));
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
    const {
      result: {
        current: { nonStyleProps },
      },
    } = renderHook(() => useStyles(allStyleProps, {}));
    expect(nonStyleProps).toEqual({});
  });

  it('should return a copy of the original object if all non style props are passed in', () => {
    const noStyleProps: ViewProps = {
      // @ts-ignore next-line
      'data-variation': 'primary',
      ariaLabel: props.ariaLabel,
      as: props.as,
    };
    const { result } = renderHook(() => useStyles(noStyleProps, {}));
    const nonStyleProps = result.current.nonStyleProps;
    expect(nonStyleProps).toEqual(noStyleProps);
    expect(nonStyleProps).not.toBe(noStyleProps);
  });
});

describe('convertGridSpan: ', () => {
  it('should return correct css value when passed valid number', () => {
    const param = 5;
    const result = convertGridSpan(param);
    expect(result).toBe(`span ${param}`);
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
    expect(result).toBe(`span ${param}`);
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

describe('splitPrimitiveProps', () => {
  it('should split props into base, flex and rest', () => {
    const baseStyleProps: BaseStyleProps = {
      backgroundColor: 'yellow',
      alignSelf: 'baseline',
      area: 'auto',
      basis: 'content',
      border: '1px solid black',
      borderRadius: '2px',
    };
    const flexContainerStyleProps: FlexContainerStyleProps = {
      alignContent: 'space-around',
      alignItems: 'baseline',
      columnGap: '2rem',
      direction: 'column-reverse',
      gap: '2rem',
      justifyContent: 'space-around',
      rowGap: '4rem',
      wrap: 'nowrap',
    };
    const restProps = {
      type: 'textarea',
      rows: '4',
      autoComplete: 'current-password',
      name: 'password',
      placeholder: 'Password',
    };

    const {
      baseStyleProps: resultBaseStyleProps,
      flexContainerStyleProps: resultFlexContainerStyleProps,
      rest: resultRest,
    } = splitPrimitiveProps({
      ...baseStyleProps,
      ...flexContainerStyleProps,
      ...restProps,
    });

    expect(resultRest).toEqual(restProps);
    expect(resultFlexContainerStyleProps).toEqual(flexContainerStyleProps);
    expect(resultBaseStyleProps).toEqual(baseStyleProps);
  });
});
