import {
  AllStyleProps,
  ComponentPropsToStylePropsMap,
  ComponentPropToStyleProp,
} from '../types/index';

export const strHasLength = (str: unknown): str is string =>
  typeof str === 'string' && str.length > 0;

/**
 * Convert style props to CSS variables for React style prop
 * Note: Will filter out undefined, null, and empty string prop values
 * @returns CSSProperties styles
 */
export const convertStylePropsToStyleObj = (props: AllStyleProps) => {
  let style: React.CSSProperties = {};
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
export const getNonStyleProps = (props: {}) => {
  const nonStyleProps = {};
  Object.keys(props).forEach((propKey) => {
    if (!(propKey in ComponentPropsToStylePropsMap)) {
      nonStyleProps[propKey] = props[propKey];
    }
  });
  return nonStyleProps;
};
