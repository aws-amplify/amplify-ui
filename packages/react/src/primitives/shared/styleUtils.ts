import * as React from 'react';
import autoprefixer from 'autoprefixer';
import postcssJs from 'postcss-js';

export const prefixer = postcssJs.sync([autoprefixer]);

import {
  ComponentPropsToStylePropsMap,
  ComponentPropsToStylePropsMapKeys,
  GridItemStyleProps,
  ResponsiveObject,
  ViewProps,
} from '../types/index';

import { getValueAtCurrentBreakpoint } from './responsive/utils';
import { useBreakpoint } from './responsive/useBreakpoint';
import { Breakpoint, Breakpoints } from '../types/responsive';

import { useTheming } from '../../theming/';
import { filterOutNullOrEmptyStringValues, isNullOrEmptyString } from './utils';

/**
 * Transforms style props to another target prop
 * where the original is a simpler API than the target.
 * This function will remove the original prop and
 * replace target prop values with calculated
 * E.g. rowSpan => row, columnSpan => column
 * @param props T
 * @returns
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
  }, [rowSpan, columnSpan, convertGridSpan]);

  return {
    row: !isNullOrEmptyString(row) ? row : rowFromSpanValue,
    column: !isNullOrEmptyString(column) ? column : columnFromSpanValue,
    ...rest,
  };
};

export const usePropStyles = (props: ViewProps, style: any) => {
  const {
    theme: {
      breakpoints: {
        values: breakpoints,
        unit: breakpointUnit,
        defaultBreakpoint,
      },
    },
  } = useTheming();

  const breakpoint = useBreakpoint({
    breakpoints,
    breakpointUnit,
    defaultBreakpoint: defaultBreakpoint as Breakpoint,
  });

  const propStyles = useTransformStyleProps(props);

  return React.useMemo(
    () =>
      prefixer(
        convertStylePropsToStyleObj({
          props: propStyles,
          style,
          breakpoint,
          breakpoints,
        })
      ),
    [props, style, breakpoints, breakpoint]
  );
};

interface convertStylePropsToStyleObjParams {
  props: ViewProps;
  style?: React.CSSProperties;
  breakpoint: Breakpoint;
  breakpoints: Breakpoints;
}
export interface ConvertStylePropsToStyleObj {
  (params: convertStylePropsToStyleObjParams);
}

export const isSpanPrimitiveValue = (
  spanValue: GridItemStyleProps['rowSpan'] | GridItemStyleProps['columnSpan']
): spanValue is 'auto' | number => {
  return (
    spanValue === 'auto' || (typeof spanValue === 'number' && !isNaN(spanValue))
  );
};

export const convertGridSpan = (
  spanValue: GridItemStyleProps['rowSpan'] | GridItemStyleProps['columnSpan']
): GridItemStyleProps['row'] | GridItemStyleProps['column'] => {
  if (isSpanPrimitiveValue(spanValue)) {
    return getGridSpan(spanValue);
  }
  if (typeof spanValue === 'object' && spanValue != null) {
    if (Array.isArray(spanValue)) {
      return spanValue.map((value) => getGridSpan(value));
    } else {
      const newObj: ResponsiveObject<string> = {};
      Object.entries(spanValue).forEach(([key, value]) => {
        newObj[key] = getGridSpan(value);
      });
      return newObj;
    }
  }
  return null;
};

export const getGridSpan = (spanValue: number | 'auto'): string => {
  return spanValue === 'auto'
    ? 'auto'
    : `span ${spanValue} / span ${spanValue}`;
};

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
}) => {
  ComponentPropsToStylePropsMapKeys.filter((stylePropKey) =>
    filterOutNullOrEmptyStringValues(props[stylePropKey])
  ).forEach((stylePropKey) => {
    let value = getValueAtCurrentBreakpoint(
      props[stylePropKey],
      breakpoint,
      breakpoints
    );
    const reactStyleProp = ComponentPropsToStylePropsMap[stylePropKey];
    style = { ...style, [reactStyleProp]: value };
  });
  return style;
};

/**
 * Filter out known style props to prevent errors adding invalid HTML attributes
 * @param props
 * @returns non styled props
 */
export const useNonStyleProps = (props: ViewProps) => {
  return React.useMemo(() => {
    const nonStyleProps = {};
    Object.keys(props).forEach((propKey) => {
      if (!(propKey in ComponentPropsToStylePropsMap)) {
        nonStyleProps[propKey] = props[propKey];
      }
    });
    return nonStyleProps;
  }, [props]);
};
