import { CssPropertiesMap, StyleProps } from "../types/index";

/**
 * Convert style props to CSS variables for React style prop
 * Note: Will filter out undefined, null, and empty string prop values
 * @param props StyleProps
 * @returns CSSProperties styles
 */
export const getStyleCssVarsFromProps = (props: {}) => {
  let style: React.CSSProperties = {};
  Object.keys(CssPropertiesMap).forEach(propKey => {
    if (
      propKey in props &&
      props[propKey] != null &&
      props[propKey].length > 0
    ) {
      style[propKey] = props[propKey];
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
  Object.keys(props).forEach(propKey => {
    if (!(propKey in CssPropertiesMap)) {
      nonStyleProps[propKey] = props[propKey];
    }
  });
  return nonStyleProps;
};
