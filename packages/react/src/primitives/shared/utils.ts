import { CustomPropertiesMap, StyleProps } from "../types/index";

const customPropertiesKeys = Object.keys(CustomPropertiesMap);

export const getStyleCssVarsFromProps = (props: StyleProps) => {
  let style: React.CSSProperties = {};
  customPropertiesKeys.forEach(propKey => {
    if (propKey in props) {
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
