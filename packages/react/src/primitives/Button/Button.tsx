import React from "react";
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps
} from "@chakra-ui/react";
import {
  ButtonProps,
  ButtonSize,
  ButtonVariant,
  ChakraButtonSizeMap
} from "../shared/types";
import { ComponentClassNames } from "../shared/constants";

const CHAKRA_FULL_WIDTH_PROPERTY = "full";

const getChakraButtonProps = ({
  active,
  disabled,
  fullWidth,
  loading,
  loadingText,
  size = ButtonSize.Medium,
  variant = ButtonVariant.Secondary
}: ButtonProps): ChakraButtonProps => {
  const chakraSize = variant != null ? ChakraButtonSizeMap[size] : undefined;
  const chakraWidth = fullWidth ? CHAKRA_FULL_WIDTH_PROPERTY : undefined;
  return {
    isActive: active,
    isLoading: loading,
    isDisabled: disabled,
    loadingText,
    size: chakraSize,
    variant,
    width: chakraWidth
  };
};

export const Button: React.FC<ButtonProps> = props => {
  const chakraButtonProps = getChakraButtonProps(props);
  const {
    active,
    ariaLabel,
    className,
    children,
    id,
    loading,
    size = ButtonSize.Medium,
    variant = ButtonVariant.Secondary,
    onClick = () => {}
  } = props;
  return (
    <ChakraButton
      {...chakraButtonProps}
      id={id}
      data-amplify-ui-button
      className={`${className}`}
      data-active={active}
      data-loading={loading}
      data-size={size}
      data-variant={variant}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </ChakraButton>
  );
};
