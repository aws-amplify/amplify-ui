import * as React from 'react';
import { isDesignToken, WebTheme } from '@aws-amplify/ui';

import {
  ComponentPropsToStylePropsMap,
  GridItemStyleProps,
  GridSpanType,
  ResponsiveObject,
  BaseViewProps,
  AllStylePropKey,
} from '../types';

import { getValueAtCurrentBreakpoint } from './responsive/utils';
import { useBreakpoint } from './responsive/useBreakpoint';
import { Breakpoint, Breakpoints } from '../types/responsive';

import { useTheme } from '../../hooks';
import {
  getCSSVariableIfValueIsThemeKey,
  isEmptyString,
  isNullOrEmptyString,
} from './utils';
import { getStyleValue } from './getStyleValue';

export const isSpanPrimitiveValue = (
  spanValue: GridItemStyleProps['rowSpan'] | GridItemStyleProps['columnSpan']
): spanValue is GridSpanType => {
  return (
    spanValue === 'auto' ||
    (typeof spanValue === 'number' && !isNaN(spanValue)) ||
    (typeof spanValue === 'string' && !isNaN(parseFloat(spanValue)))
  );
};

export const getGridSpan = (spanValue: GridSpanType): string => {
  return spanValue === 'auto' ? 'auto' : `span ${spanValue}`;
};

export const convertGridSpan = (
  spanValue?: GridItemStyleProps['rowSpan'] | GridItemStyleProps['columnSpan']
): GridItemStyleProps['row'] | GridItemStyleProps['column'] | null => {
  // PropertyType
  if (isSpanPrimitiveValue(spanValue)) {
    return getGridSpan(spanValue);
  }
  // PropertyType[]
  if (Array.isArray(spanValue)) {
    return spanValue.map((value) => getGridSpan(value));
  }
  // ResponsiveObject<PropertyType>
  if (typeof spanValue === 'object' && spanValue != null) {
    return (Object.entries(spanValue) as Array<[string, GridSpanType]>).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: getGridSpan(value) }),
      {} as ResponsiveObject<string>
    );
    // let newObj: ResponsiveObject<string> = {};
    // Object.entries(spanValue).forEach(
    //   ([key, value]: [string, GridSpanType]) => {
    //     newObj = {
    //       ...newObj,
    //       [key]: getGridSpan(value),
    //     };
    //   }
    // );
    // return newObj;
  }
  return null;
};

interface UseTransformStyleProps extends Record<string, any> {
  row?: GridItemStyleProps['row'];
  column?: GridItemStyleProps['column'];
  rowSpan?: GridItemStyleProps['rowSpan'];
  columnSpan?: GridItemStyleProps['columnSpan'];
}

/**
 * Transforms style props to another target prop
 * where the original is a simpler API than the target.
 * This function will remove the original prop and
 * replace target prop values with calculated
 * E.g. rowSpan => row, columnSpan => column
 */
export const useTransformStyleProps = (
  props: UseTransformStyleProps
): Record<string, any> => {
  const { rowSpan, columnSpan, row, column, ...rest } = props;

  const { rowFromSpanValue, columnFromSpanValue } = React.useMemo(() => {
    return {
      rowFromSpanValue: convertGridSpan(rowSpan),
      columnFromSpanValue: convertGridSpan(columnSpan),
    };
  }, [rowSpan, columnSpan]);

  return {
    row: !isNullOrEmptyString(row) ? row : rowFromSpanValue,
    column: !isNullOrEmptyString(column) ? column : columnFromSpanValue,
    ...rest,
  };
};

interface ConvertStylePropsToStyleObjParams {
  // we don't know what props we will get passed
  // we will narrow down the type in the function
  props: Record<string, unknown>;
  style?: React.CSSProperties;
  breakpoint: Breakpoint;
  breakpoints: Breakpoints;
  tokens: WebTheme['tokens'];
}

export interface ConvertStylePropsToStyleObj {
  (params: ConvertStylePropsToStyleObjParams): {
    propStyles: React.CSSProperties;
    nonStyleProps: Partial<BaseViewProps>;
  };
}

const isComponentStyleProp = (key: string): key is AllStylePropKey => {
  return key in ComponentPropsToStylePropsMap;
};

/**
 * Convert style props to CSS variables for React style prop
 * Note: Will filter out undefined, null, and empty string prop values
 */
export const convertStylePropsToStyleObj: ConvertStylePropsToStyleObj = ({
  props = {},
  style = {},
  breakpoint,
  breakpoints,
  tokens,
}) => {
  const nonStyleProps: Record<string, unknown> = {};
  Object.keys(props)
    .filter((propKey) => props[propKey] !== null)
    .forEach((propKey) => {
      if (isComponentStyleProp(propKey)) {
        const values = props[propKey];
        if (!values || isEmptyString(values)) return;

        const reactStyleProp = ComponentPropsToStylePropsMap[propKey];
        // short circuit the style prop here if it is a string or design token
        // so we don't have to call getValueAtCurrentBreakpoint every time
        let value: number | string | null = '';
        if (isDesignToken(values)) {
          value = values.toString();
        } else if (typeof values === 'string') {
          value = getCSSVariableIfValueIsThemeKey(propKey, values, tokens);
        } else if (typeof values === 'number') {
          value = values;
        } else if (typeof values === 'object') {
          // here values should be a responsive array or object
          value = getStyleValue({
            propKey,
            tokens,
            value: getValueAtCurrentBreakpoint({
              values,
              breakpoint,
              breakpoints,
            }),
          });
        }
        style = {
          ...style,
          [reactStyleProp]: value,
        };
      } else if (typeof props[propKey] !== 'undefined') {
        nonStyleProps[propKey] = props[propKey];
      }
    });
  return { propStyles: style, nonStyleProps };
};

export const useStyles = (
  props: Record<string, unknown>,
  style?: React.CSSProperties
): {
  propStyles: React.CSSProperties;
  nonStyleProps: Partial<BaseViewProps>;
} => {
  const {
    breakpoints: { values: breakpoints, defaultBreakpoint },
    tokens,
  } = useTheme();

  const breakpoint = useBreakpoint({
    breakpoints,
    defaultBreakpoint,
  });

  const propStyles = useTransformStyleProps(props);

  return React.useMemo(
    () =>
      convertStylePropsToStyleObj({
        props: propStyles,
        style,
        breakpoint,
        breakpoints,
        tokens,
      }),
    [propStyles, style, breakpoints, breakpoint, tokens]
  );
};
