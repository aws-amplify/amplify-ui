import { CustomPropertiesMap, StyleProps } from "../types/index";

export const getStyleCssVarsFromProps = (props: StyleProps) => {
  let style: React.CSSProperties = {};
  Object.keys(CustomPropertiesMap).forEach(propKey => {
    if (propKey in props) {
      style[CustomPropertiesMap[propKey]] = props[propKey];
    }
  });
  return style;
};
