import classNames from "classnames";
import React from "react";
import { ComponentClassNames } from "../shared/constants";
import { getStyleCssVarsFromProps, getNonStyleProps } from "../shared/utils";
import { ViewProps } from "../types/index";

export const View: React.FC<ViewProps> = props => {
  const {
    as: asElementTag,
    className,
    children,
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
      disabled={isDisabled}
      {...getNonStyleProps(rest)}
    >
      {children}
    </ViewTag>
  );
};
