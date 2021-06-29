import classNames from "classnames";
import React from "react";
import { ComponentClassNames } from "../shared/constants";
import { getStyleCssVarsFromProps } from "../shared/utils";
import { ViewProps } from "../types/index";

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
      style={getStyleCssVarsFromProps(props)}
      aria-label={ariaLabel}
      role={role}
      className={classNames(ComponentClassNames.View, className)}
      id={id}
      disabled={isDisabled}
      {...rest}
    >
      {children}
    </ViewTag>
  );
};
