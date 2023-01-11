import * as React from 'react';

import {
  ComponentPropsToStylePropsMap,
  GridItemStyleProps,
  GridSpanType,
  ResponsiveObject,
  ViewProps,
} from '../types';

import { getValueAtCurrentBreakpoint } from './responsive/utils';
import { useBreakpoint } from './responsive/useBreakpoint';
import { Breakpoint, Breakpoints } from '../types/responsive';

import { useTheme } from '../../hooks';
import { isEmptyString, isNullOrEmptyString } from './utils';
import { ThemeStylePropKey } from '../types/theme';
import { WebTheme } from '@aws-amplify/ui';

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
  spanValue: GridItemStyleProps['rowSpan'] | GridItemStyleProps['columnSpan']
): GridItemStyleProps['row'] | GridItemStyleProps['column'] => {
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
    const newObj: ResponsiveObject<string> = {};
    Object.entries(spanValue).forEach(([key, value]) => {
      newObj[key] = getGridSpan(value as GridSpanType);
    });
    return newObj;
  }
  return null;
};

/**
 * Transforms style props to another target prop
 * where the original is a simpler API than the target.
 * This function will remove the original prop and
 * replace target prop values with calculated
 * E.g. rowSpan => row, columnSpan => column
 */
export const useTransformStyleProps = (props: ViewProps): ViewProps => {
  const { rowSpan, columnSpan, row, column, ...rest } = props;

  const { rowFromSpanValue, columnFromSpanValue } = React.useMemo(() => {
    return {
      rowFromSpanValue: convertGridSpan(rowSpan) as GridItemStyleProps['row'],
      columnFromSpanValue: convertGridSpan(
        columnSpan
      ) as GridItemStyleProps['column'],
    };
  }, [rowSpan, columnSpan]);

  return {
    row: !isNullOrEmptyString(row) ? row : rowFromSpanValue,
    column: !isNullOrEmptyString(column) ? column : columnFromSpanValue,
    ...rest,
  };
};

interface ConvertStylePropsToStyleObjParams {
  props: ViewProps;
  style?: React.CSSProperties;
  breakpoint: Breakpoint;
  breakpoints: Breakpoints;
  tokens: WebTheme['tokens'];
}
export interface ConvertStylePropsToStyleObj {
  (params: ConvertStylePropsToStyleObjParams): {
    propStyles: React.CSSProperties;
    nonStyleProps: Partial<ViewProps>;
  };
}

/**
 * Convert style props to CSS variables for React style prop
 * Note: Will filter out undefined, null, and empty string prop values
 * @returns CSSProperties styles
 */
export const convertStylePropsToStyleObj: ConvertStylePropsToStyleObj = ({
  props = {},
  style = {},
  breakpoint,
  breakpoints,
  tokens,
}) => {
  const nonStyleProps = {};
  Object.keys(props)
    .filter((propKey) => props[propKey] != null)
    .forEach((propKey: ThemeStylePropKey) => {
      if (!(propKey in ComponentPropsToStylePropsMap)) {
        nonStyleProps[propKey] = props[propKey] as ViewProps;
      } else if (!isEmptyString(props[propKey])) {
        const values = props[propKey] as ViewProps;
        const reactStyleProp = ComponentPropsToStylePropsMap[propKey];

        style = {
          ...style,
          [reactStyleProp]: getValueAtCurrentBreakpoint({
            values,
            breakpoint,
            breakpoints,
            propKey,
            tokens,
          }),
        };
      }
    });
  return { propStyles: style, nonStyleProps };
};

export const useStyles = (
  props: ViewProps,
  style?: React.CSSProperties
): {
  propStyles: React.CSSProperties;
  nonStyleProps: Partial<ViewProps>;
} => {
  const {
    breakpoints: { values: breakpoints, defaultBreakpoint },
    tokens,
  } = useTheme();

  const breakpoint = useBreakpoint({
    breakpoints,
    defaultBreakpoint: defaultBreakpoint as Breakpoint,
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
