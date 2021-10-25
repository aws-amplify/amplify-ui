import * as React from 'react';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss-js';

export const prefixer = postcss.sync([autoprefixer]);

import {
  BaseStyleProps,
  ComponentPropsToStylePropsMap,
  ComponentPropsToStylePropsMapKeys,
  GridItemStyleProps,
  ResponsiveObject,
  ViewProps,
} from '../types';

import { getValueAtCurrentBreakpoint } from './responsive/utils';
import { useBreakpoint } from './responsive/useBreakpoint';
import { Breakpoint, Breakpoints } from '../types/responsive';

import { useTheme } from '../../hooks';
import { isNullOrEmptyString } from './utils';
import { FlexContainerStyleProps } from '../types/flex';

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
  }, [rowSpan, columnSpan, convertGridSpan]);

  return {
    row: !isNullOrEmptyString(row) ? row : rowFromSpanValue,
    column: !isNullOrEmptyString(column) ? column : columnFromSpanValue,
    ...rest,
  };
};

export const usePropStyles = (props: ViewProps, style: React.CSSProperties) => {
  const {
    breakpoints: {
      values: breakpoints,
      unit: breakpointUnit,
      defaultBreakpoint,
    },
  } = useTheme();

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
    [propStyles, style, breakpoints, breakpoint]
  );
};

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
      newObj[key] = getGridSpan(value);
    });
    return newObj;
  }
  return null;
};

export const getGridSpan = (spanValue: number | 'auto'): string => {
  return spanValue === 'auto' ? 'auto' : `span ${spanValue}`;
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
  ComponentPropsToStylePropsMapKeys.filter(
    (stylePropKey) => !isNullOrEmptyString(props[stylePropKey])
  ).forEach((stylePropKey) => {
    const value = getValueAtCurrentBreakpoint(
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

/**
 * Map of all the FlexContainerStyleProps type keys
 * The type requires all keys in order to ensure it remains
 * in sync with the FlexContainerStyleProps type.
 */
const FlexContainerStylePropsMap: Required<
  { [key in keyof FlexContainerStyleProps]: true }
> = {
  alignContent: true,
  alignItems: true,
  direction: true,
  gap: true,
  justifyContent: true,
  wrap: true,
  columnGap: true,
  rowGap: true,
};

/**
 * Map of all the FlexContainerStyleProps type keys
 * The type requires all keys in order to ensure it remains
 * in sync with the FlexContainerStyleProps type.
 */
const BaseStylePropsMap: Required<{ [key in keyof BaseStyleProps]: true }> = {
  alignSelf: true,
  area: true,
  backgroundColor: true,
  basis: true,
  border: true,
  borderRadius: true,
  bottom: true,
  boxShadow: true,
  color: true,
  column: true,
  columnEnd: true,
  columnSpan: true,
  columnStart: true,
  flex: true,
  fontFamily: true,
  fontSize: true,
  fontStyle: true,
  fontWeight: true,
  grow: true,
  height: true,
  left: true,
  letterSpacing: true,
  lineHeight: true,
  maxHeight: true,
  maxWidth: true,
  minHeight: true,
  minWidth: true,
  opacity: true,
  order: true,
  padding: true,
  position: true,
  right: true,
  row: true,
  rowEnd: true,
  rowSpan: true,
  rowStart: true,
  shrink: true,
  textAlign: true,
  textDecoration: true,
  top: true,
  width: true,
};

interface SplitProps<PrimitiveProps> {
  flexContainerStyleProps: FlexContainerStyleProps;
  baseStyleProps: BaseStyleProps;
  rest: Omit<
    PrimitiveProps,
    keyof FlexContainerStyleProps | keyof BaseStyleProps
  >;
}

export const splitPrimitiveProps = <
  PrimitiveProps extends { [index: string]: unknown }
>(
  props: PrimitiveProps
): SplitProps<PrimitiveProps> => {
  let rest = {} as SplitProps<PrimitiveProps>['rest'];
  let flexContainerStyleProps = {};
  let baseStyleProps = {};

  for (const prop in props) {
    if (prop in FlexContainerStylePropsMap) {
      flexContainerStyleProps = {
        ...flexContainerStyleProps,
        [prop]: props[prop],
      };
    } else if (prop in BaseStylePropsMap) {
      baseStyleProps = { ...baseStyleProps, [prop]: props[prop] };
    } else {
      rest = { ...rest, [prop]: props[prop] };
    }
  }

  return {
    flexContainerStyleProps,
    baseStyleProps,
    rest,
  };
};
