import * as React from 'react';
import autoprefixer from 'autoprefixer';
import postcssJs from 'postcss-js';
// import useBreakpoint from 'use-breakpoint';
// Note: this makes nanoid more performant, not less secure
// @see https://www.npmjs.com/package/nanoid#user-content-non-secure
import { customAlphabet } from 'nanoid/non-secure';
const nanoid = customAlphabet('1234567890abcdef', 12);

import { theme } from '@aws-amplify/ui';

import {
  ComponentPropsToStylePropsMap,
  ComponentPropToStyleProp,
  ViewProps,
} from '../types/index';

import { getValueAtCurrentBreakpoint } from './responsive/utils';
import { useBreakpoint } from './responsive/useBreakpoint';

export const prefixer = postcssJs.sync([autoprefixer]);

const {
  values: breakpoints,
  unit: breakpointUnit,
  default: defaultBreakpoint,
} = theme.breakpoints;

export const strHasLength = (str: unknown): str is string =>
  typeof str === 'string' && str.length > 0;

export const usePropStyles = (props: ViewProps, style: any) => {
  const breakpoint = useBreakpoint({
    breakpoints,
    breakpointUnit,
    defaultBreakpoint,
  });

  return React.useMemo(
    () =>
      prefixer(
        convertStylePropsToStyleObj(props, style, breakpoint, breakpoints)
      ),
    [props, style, breakpoints, breakpoint]
  );
};

/**
 * Convert style props to CSS variables for React style prop
 * Note: Will filter out undefined, null, and empty string prop values
 * @returns CSSProperties styles
 */
export const convertStylePropsToStyleObj = (
  props: ViewProps,
  style: React.CSSProperties = {},
  breakpoint,
  breakpoints
) => {
  (
    Object.keys(ComponentPropsToStylePropsMap) as Array<
      keyof ComponentPropToStyleProp
    >
  ).forEach((stylePropKey) => {
    let stylePropValue = props[stylePropKey];

    if (
      stylePropValue != null &&
      (typeof stylePropValue !== 'string' || strHasLength(stylePropValue))
    ) {
      if (typeof stylePropValue !== 'string' || Array.isArray(stylePropValue)) {
        stylePropValue = getValueAtCurrentBreakpoint(
          stylePropValue,
          breakpoint,
          breakpoints
        );
      }
      const reactStyleProp = ComponentPropsToStylePropsMap[stylePropKey];
      style = { ...style, [reactStyleProp]: stylePropValue };
    }
  });
  return style;
};

/**
 * Filter out known style props to prevent errors adding invalid HTML attributes
 * @param props
 * @returns non styled props
 */
export const useNonStyleProps = (props: ViewProps) => {
  const getNonStyleProps = React.useCallback(() => {
    const nonStyleProps = {};
    Object.keys(props).forEach((propKey) => {
      if (!(propKey in ComponentPropsToStylePropsMap)) {
        nonStyleProps[propKey] = props[propKey];
      }
    });
    return nonStyleProps;
  }, [props]);
  return getNonStyleProps();
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
