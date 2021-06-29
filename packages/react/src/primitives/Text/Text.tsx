import React from "react";
import { ComponentClassNames } from "../shared/constants";
import { TextOptions } from "../shared/types";

const getStyle = props => {
  enum CustomPropertiesMap {
    color = "--color",
    fontStyle = "--font-style",
    textDecoration = "--text-decoration",
    fontWeight = "--font-weight",
    letterSpacing = "--letter-spacing",
    lineHeight = "--line-height",
  }

  let style: React.CSSProperties = {};
  Object.keys(CustomPropertiesMap).forEach(propKey => {
    if (propKey in props) {
      style[CustomPropertiesMap[propKey]] = props[propKey];
    }
  });
  return style;
};

export const Text: React.FC<TextOptions> = props => {
  const {
    ariaLabel,
    className = "",
    children,
    id,
    isTruncated,
    variant,
    fontStyle,
    fontFamily,
    textDecoration,
    fontWeight,
    color,
    letterSpacing,
    lineHeight,
  } = props;
  return (
    <div
      aria-label={ariaLabel}
      className={`${ComponentClassNames.Text} ${className}`}
      data-variant={variant}
      data-truncate={isTruncated}
      id={id}
      style={getStyle(props)}
    >
      {children}
    </div>
  );
};
