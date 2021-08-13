import {
  ComponentPropsToStylePropsMap,
  ComponentPropToStyleProp,
  ViewProps,
} from '../types/index';

export const strHasLength = (str: unknown): str is string =>
  typeof str === 'string' && str.length > 0;

/**
 * Convert style props to CSS variables for React style prop
 * Note: Will filter out undefined, null, and empty string prop values
 * @returns CSSProperties styles
 */
export const convertStylePropsToStyleObj = (
  props: ViewProps,
  style: React.CSSProperties = {}
) => {
  (
    Object.keys(ComponentPropsToStylePropsMap) as Array<
      keyof ComponentPropToStyleProp
    >
  ).forEach((stylePropKey) => {
    const stylePropValue = props[stylePropKey];
    if (
      stylePropValue != null &&
      (typeof stylePropValue !== 'string' || strHasLength(stylePropValue))
    ) {
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
export const getNonStyleProps = (props: ViewProps) => {
  const nonStyleProps = {};
  Object.keys(props).forEach((propKey) => {
    if (!(propKey in ComponentPropsToStylePropsMap)) {
      nonStyleProps[propKey] = props[propKey];
    }
  });
  return nonStyleProps;
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
