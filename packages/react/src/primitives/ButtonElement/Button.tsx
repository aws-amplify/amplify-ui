import React from "react";
import { ButtonProps, ButtonSize, ButtonVariant } from "../shared/types";
export const ButtonElement: React.FC<ButtonProps> = props => {
  const {
    active,
    ariaLabel,
    children,
    disabled,
    id,
    loading,
    loadingText,
    size = ButtonSize.Medium,
    variant = ButtonVariant.Secondary,
    fullWidth = false,
    onClick = () => {}
  } = props;
  return (
    <button
      id={id}
      className={`amplify-ui-button ${props.className}`}
      disabled={disabled || loading}
      data-loading={loading}
      data-fullwidth={fullWidth}
      data-active={active}
      data-size={size}
      data-variant={variant}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {loading ? <span>{loadingText}</span> : children}
    </button>
  );
};
