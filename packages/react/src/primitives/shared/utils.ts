import { CustomPropertiesMap, StyleProps } from "../types/index";

/**
 * Convert style props to CSS variables for React style prop
 * @param props StyleProps
 * @returns CSSProperties styles
 */
export const getStyleCssVarsFromProps = (props: StyleProps) => {
  let style: React.CSSProperties = {};
  Object.keys(CustomPropertiesMap).forEach(propKey => {
    if (propKey in props && props[propKey].length > 0) {
      style[CustomPropertiesMap[propKey]] = props[propKey];
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
    if (!(propKey in CustomPropertiesMap)) {
      nonStyleProps[propKey] = props[propKey]
    }
  });
  return nonStyleProps;
}
