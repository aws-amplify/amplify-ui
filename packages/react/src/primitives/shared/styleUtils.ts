import * as React from 'react';

import {
  BaseStyleProps,
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
  }, [rowSpan, columnSpan]);

  return {
    row: !isNullOrEmptyString(row) ? row : rowFromSpanValue,
    column: !isNullOrEmptyString(column) ? column : columnFromSpanValue,
    ...rest,
  };
};

export const useStyles = (props: ViewProps, style: React.CSSProperties) => {
  const {
    breakpoints: { values: breakpoints, defaultBreakpoint },
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
      }),
    [propStyles, style, breakpoints, breakpoint]
  );
};

export const isSpanPrimitiveValue = (
  spanValue: GridItemStyleProps['rowSpan'] | GridItemStyleProps['columnSpan']
): spanValue is GridSpanType => {
  return (
    spanValue === 'auto' ||
    (typeof spanValue === 'number' && !isNaN(spanValue)) ||
    (typeof spanValue === 'string' && !isNaN(parseFloat(spanValue)))
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

export const getGridSpan = (spanValue: GridSpanType): string => {
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
  const nonStyleProps = {};
  Object.keys(props)
    .filter((propKey) => props[propKey] != null)
    .forEach((propKey) => {
      if (!(propKey in ComponentPropsToStylePropsMap)) {
        nonStyleProps[propKey] = props[propKey];
      } else if (!isEmptyString(props[propKey])) {
        let value = props[propKey];
        value = getValueAtCurrentBreakpoint(
          value,
          breakpoint,
          breakpoints,
          propKey
        );

        const reactStyleProp = ComponentPropsToStylePropsMap[propKey];
        style = { ...style, [reactStyleProp]: value };
      }
    });
  return { propStyles: style, nonStyleProps };
};

/**
 * Map of all the FlexContainerStyleProps type keys
 * The type requires all keys in order to ensure it remains
 * in sync with the FlexContainerStyleProps type.
 */
const FlexContainerStylePropsMap: Required<{
  [key in keyof FlexContainerStyleProps]: true;
}> = {
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
 * Map of all the BaseStylePropsMap type keys
 * The type requires all keys in order to ensure it remains
 * in sync with the BaseStylePropsMap type.
 */
const BaseStylePropsMap: Required<{ [key in keyof BaseStyleProps]: true }> = {
  alignSelf: true,
  area: true,
  backgroundColor: true,
  backgroundImage: true,
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
  display: true,
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
  margin: true,
  marginBlockEnd: true,
  marginBlockStart: true,
  marginBottom: true,
  marginInlineEnd: true,
  marginInlineStart: true,
  marginLeft: true,
  marginRight: true,
  marginTop: true,
  maxHeight: true,
  maxWidth: true,
  minHeight: true,
  minWidth: true,
  opacity: true,
  order: true,
  overflow: true,
  padding: true,
  paddingBlockEnd: true,
  paddingBlockStart: true,
  paddingBottom: true,
  paddingInlineEnd: true,
  paddingInlineStart: true,
  paddingLeft: true,
  paddingRight: true,
  paddingTop: true,
  position: true,
  right: true,
  row: true,
  rowEnd: true,
  rowSpan: true,
  rowStart: true,
  shrink: true,
  textAlign: true,
  textDecoration: true,
  textTransform: true,
  top: true,
  transform: true,
  transformOrigin: true,
  width: true,
  whiteSpace: true,
};

interface SplitProps<PrimitiveProps> {
  flexContainerStyleProps: FlexContainerStyleProps;
  baseStyleProps: BaseStyleProps;
  rest: Omit<
    PrimitiveProps,
    keyof FlexContainerStyleProps | keyof BaseStyleProps
  >;
}

export const splitPrimitiveProps = <PrimitiveProps>(
  props: PrimitiveProps
): SplitProps<PrimitiveProps> => {
  const splitProps: SplitProps<PrimitiveProps> = {
    flexContainerStyleProps: {},
    baseStyleProps: {},
    rest: {} as SplitProps<PrimitiveProps>['rest'],
  };

  Object.keys(props).forEach((prop) => {
    if (prop in FlexContainerStylePropsMap) {
      splitProps.flexContainerStyleProps[prop] = props[prop];
    } else if (prop in BaseStylePropsMap) {
      splitProps.baseStyleProps[prop] = props[prop];
    } else {
      splitProps.rest[prop] = props[prop];
    }
  });

  return splitProps;
};
