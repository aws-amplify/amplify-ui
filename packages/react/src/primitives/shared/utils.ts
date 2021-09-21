import * as React from 'react';
import autoprefixer from 'autoprefixer';
import postcssJs from 'postcss-js';

// Note: this makes nanoid more performant, not less secure
// @see https://www.npmjs.com/package/nanoid#user-content-non-secure
import { customAlphabet } from 'nanoid/non-secure';
const nanoid = customAlphabet('1234567890abcdef', 12);

import {
  ComponentPropsToStylePropsMap,
  ComponentPropsToStylePropsMapKeys,
  ResponsiveStyle,
  StyleConverter,
  ViewProps,
} from '../types/index';

import { getValueAtCurrentBreakpoint } from './responsive/utils';
import { useBreakpoint } from './responsive/useBreakpoint';
import { Breakpoint, Breakpoints } from '../types/responsive';

import { useTheming } from '../../theming/';

export const prefixer = postcssJs.sync([autoprefixer]);

export const strHasLength = (str: unknown): str is string =>
  typeof str === 'string' && str.length > 0;

export const isFn = (fn: unknown): fn is Function => typeof fn === 'function';
const filterOutNullOrEmptyStringValues = (value) =>
  value != null && (typeof value !== 'string' || strHasLength(value));

// export const filterNullOrEmptyStringFromObject = (props: ViewProps) => {
//   return Object.fromEntries(
//     Object.entries(props).filter(([key, value]) =>
//       filterOutNullOrEmptyStringValues(value)
//     )
//   );
// };
export const useTransformStyleProps = (props: ViewProps): ViewProps => {
  const { rowSpan, columnSpan, ...rest } = props;

  const gridProps = React.useMemo(
    () => ({
      row: rowSpan != null ? convertGridSpan(rowSpan) : null, // should we filter out undefined values earlier?
      column: columnSpan != null ? convertGridSpan(columnSpan) : null,
    }),
    [rowSpan, columnSpan]
  );

  // allow grid span row and column to be overwritten
  // by explicit `row` or `column` prop via ...rest
  return {
    ...gridProps,
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
    [propStyles, style, breakpoints, breakpoint]
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

export type SpanStyleConverter = (
  spanValue: ResponsiveStyle<number | 'auto'>
) => StyleConverter;

export const convertGridSpan: SpanStyleConverter = (spanValue) => {
  return () =>
    spanValue === 'auto' ? 'auto' : `span ${spanValue}/span ${spanValue}`;
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
    let valueOrFn = getValueAtCurrentBreakpoint(
      props[stylePropKey],
      breakpoint,
      breakpoints
    );
    let value = isFn(valueOrFn) ? valueOrFn() : valueOrFn;
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
 * Create a consecutive integer array from start value to end value.
 * @param start start value
 * @param end end value
 * @returns an integer array with elements from start to end consecutively
 */
export const getConsecutiveIntArray = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

/**
 * Create a uuid to use with amplify fields unless
 * an id is already defined
 * @param id user specified id or undefined
 * @returns string
 */
export const useAmplifyFieldID = (id?: string) => {
  return React.useMemo(() => {
    if (id) {
      return id;
    }
    return `amplify-field-${nanoid()}`;
  }, [id]);
};

/**
 * This method is used to parse through all of the overrides and
 * only pass the relevant child overrides for a given component.
 * @param overrides escape hatch props
 * @param elementHierarchy
 * @returns overrides only for specified element
 */
export const findChildOverrides = (
  overrides: EscapeHatchProps | null | undefined,
  elementHierarchy: string
) => {
  if (!overrides) {
    return null;
  }

  const filteredOverrides = Object.entries(overrides).filter((m) =>
    m[0].startsWith(elementHierarchy)
  );

  return Object.assign(
    {},
    ...Array.from(filteredOverrides, ([k, v]) => ({
      [k.replace(elementHierarchy, '')]: v,
    }))
  );
};

/**
 * This helper method is used to get the overrides
 * that will be applied to a component
 * @param overrides escape hatch props
 * @param elementHierarchy
 * @returns component overrides
 */
export const getOverrideProps = (
  overrides: EscapeHatchProps | null | undefined,
  elementHierarchy: string
) => {
  if (!overrides) {
    return null;
  }

  const componentOverrides = Object.entries(overrides)
    .filter((m) => m[0] === elementHierarchy)
    .flatMap((m) => {
      const values = Object.entries(m[1]);
      return [values[0], values[1]];
    })
    .filter((m) => m?.[0]);

  return Object.fromEntries(componentOverrides);
};

export type EscapeHatchProps = {
  [elementHierarchy: string]: Record<string, string>;
};
