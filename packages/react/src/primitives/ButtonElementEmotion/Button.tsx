import React from "react";
import styled, { CSSObject } from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { ButtonProps, ButtonSize, ButtonVariant } from "../shared/types";
import { AmplifyComponent } from "../AmplifyUIProvider/AmplifyUI";

const getEmotionStateAttributes = (styles: CSSObject) => {
  let current = styles;
  const keys = Object.keys(current);
  for (let key of keys) {
    if (key === "_hover") {
      current["&:hover"] = current["_hover"];
    }
    if (key === "_disabled") {
      current["&[disabled]"] = current["_disabled"];
    }
  }
  return styles;
};

const getButtonStyles = (theme, props: ButtonProps): CSSObject => {
  // @TODO: still needs some work to merge nested objects
  // (baseStyles and variant _disabled styles, for example)

  const { baseStyle, variants, sizes, states } = theme.components.Button;
  let styles = { ...baseStyle };
  if (props.variant in variants) {
    styles = { ...styles, ...variants[props.variant] };
  }
  if (props.size in sizes) {
    styles = { ...styles, ...sizes[props.size] };
  }
  if (props.loading && states?.loading != null) {
    styles = { ...styles, ...states.loading };
  }
  return getEmotionStateAttributes(styles);
};

export const ButtonElementEmotion: React.FC<ButtonProps> = props => {
  const {
    active,
    ariaLabel,
    children,
    disabled,
    id,
    loading,
    loadingText = "Loading...",
    size = ButtonSize.Medium,
    variant = ButtonVariant.Secondary,
    fullWidth = false,
    onClick = () => {}
  } = props;
  const theme = useTheme();
  const styles = getButtonStyles(theme, { variant, size, loading });

  const Button = styled.button(() => {
    return styles;
  });

  return (
    <AmplifyComponent>
      <Button
        id={id}
        className={props.className}
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
      </Button>
    </AmplifyComponent>
  );
};
