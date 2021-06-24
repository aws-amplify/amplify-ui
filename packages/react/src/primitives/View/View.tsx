import React from "react";
import { ComponentClassNames } from "../shared/constants";
import { CustomPropertiesMap, ViewProps } from "../types/index";

const getStyle = (props: ViewProps) => {
  let style: React.CSSProperties = {};
  Object.keys(CustomPropertiesMap).forEach(propKey => {
    if (propKey in props) {
      style[CustomPropertiesMap[propKey]] = props[propKey];
    }
  });
  return style;
};

export const View: React.FC<ViewProps> = props => {
  const {
    as: asElementTag,
    id,
    className,
    children,

    backgroundColor,
    color,
    shadow,
    padding,
    border,
    cornerRadius,
    height,
    maxHeight,
    minHeight,
    width,
    maxWidth,
    minWidth,
    opacity,

    role,
    ariaLabel,
    isDisabled,
    ...rest
  } = props;

  const ViewTag = asElementTag ?? "div";

  return (
    <ViewTag
      style={getStyle(props)}
      aria-label={ariaLabel}
      role={role}
      className={
        className
          ? `${ComponentClassNames.View} ${className}`
          : ComponentClassNames.View
      }
      id={id}
      disabled={isDisabled}
      {...rest}
    >
      {children}
    </ViewTag>
  );
};
