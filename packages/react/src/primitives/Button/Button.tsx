import React from "react";
import { ComponentClassNames } from "../shared/constants";
import {
  ButtonProps,
  ButtonSize,
  ButtonVariant,
  ButtonTypes,
} from "../shared/types";

export const Button: React.FC<ButtonProps> = ({
  ariaLabel,
  className = "",
  children,
  isFullWidth = false,
  isDisabled,
  isLoading,
  id,
  loadingText = "",
  onClick = () => {},
  size = "medium",
  variant = "secondary",
  type = "button",
}) => (
  <button
    aria-label={ariaLabel}
    className={`${ComponentClassNames.AmplifyButton} ${className}`}
    disabled={isDisabled || isLoading}
    data-loading={isLoading}
    data-fullwidth={isFullWidth}
    data-size={size}
    data-variant={variant}
    id={id}
    onClick={onClick}
    type={type}
  >
    {isLoading && loadingText ? <span>{loadingText}</span> : children}
  </button>
);
