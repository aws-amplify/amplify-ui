import {
  BackgroundColorValue,
  BorderColorValue,
  BorderWidthValue,
  BoxShadowValue,
  ColorValue,
  DesignToken,
} from '../types/designToken';

interface ToggleButtonHoverTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
}
interface ToggleButtonActiveTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
}
interface ToggleButtonFocusTokens {
  borderColor: DesignToken<BorderColorValue>;
  color: DesignToken<ColorValue>;
}

interface ToggleButtonDisabledTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
  borderColor: DesignToken<BorderColorValue>;
  color: DesignToken<ColorValue>;
}

interface ToggleButtonPressedTokens {
  color: DesignToken<ColorValue>;
  backgroundColor: DesignToken<BackgroundColorValue>;
  _hover: ToggleButtonPressedHoverTokens;
}

interface ToggleButtonPressedHoverTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
}

interface ToggleButtonPrimaryTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
  borderWidth: DesignToken<BorderWidthValue>;
  _focus: ToggleButtonPrimaryFocusTokens;
  _hover: ToggleButtonPrimaryHoverTokens;
  _disabled: ToggleButtonPrimaryDisabledTokens;
  _pressed: ToggleButtonPrimaryPressedTokens;
}
interface ToggleButtonPrimaryFocusTokens {
  borderColor: DesignToken<BorderColorValue>;
  backgroundColor: DesignToken<BackgroundColorValue>;
  boxShadow: DesignToken<BoxShadowValue>;
  color: DesignToken<ColorValue>;
}

interface ToggleButtonPrimaryHoverTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
  color: DesignToken<ColorValue>;
}

interface ToggleButtonPrimaryDisabledTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
  color: DesignToken<ColorValue>;
}

interface ToggleButtonPrimaryDisabledTokens {
  color: DesignToken<ColorValue>;
}

interface ToggleButtonPrimaryPressedTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
  borderColor: DesignToken<BorderColorValue>;
  color: DesignToken<ColorValue>;
  _focus: TogglButtonPrimaryPressedFocusTokens;
  _hover: TogglButtonPrimaryPressedHoverTokens;
}

interface TogglButtonPrimaryPressedFocusTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
  borderColor: DesignToken<BorderColorValue>;
}
interface TogglButtonPrimaryPressedHoverTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
  borderColor: DesignToken<BorderColorValue>;
}

interface ToggleButtonLinkTokens {
  color: DesignToken<ColorValue>;
  _hover: ToggleButtonLinkHoverTokens;
  _focus: ToggleButtonLinkFocusTokens;
  _disabled: ToggleButtonLinkDisabledTokens;
  _pressed: ToggleButtonLinkPressedTokens;
}
interface ToggleButtonLinkHoverTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
  color: DesignToken<ColorValue>;
}

interface ToggleButtonLinkFocusTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
  color: DesignToken<ColorValue>;
}

interface ToggleButtonLinkDisabledTokens {
  color: DesignToken<ColorValue>;
}

interface ToggleButtonLinkPressedTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
  color: DesignToken<ColorValue>;
  _hover: ToggleButtonLinkPressedHoverTokens;
}

interface ToggleButtonLinkPressedHoverTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
}

export interface ToggleButtonTokens {
  borderColor: DesignToken<BorderColorValue>;
  color: DesignToken<ColorValue>;
  _hover: ToggleButtonHoverTokens;
  _focus: ToggleButtonFocusTokens;
  _active: ToggleButtonActiveTokens;
  _disabled: ToggleButtonDisabledTokens;
  _pressed: ToggleButtonPressedTokens;
  primary: ToggleButtonPrimaryTokens;
  link: ToggleButtonLinkTokens;
}

export const togglebutton: ToggleButtonTokens = {
  borderColor: { value: '{colors.border.primary.value}' },
  color: { value: '{colors.overlay.50.value}' },
  _hover: {
    backgroundColor: { value: '{colors.overlay.10.value}' },
  },
  _focus: {
    borderColor: { value: '{colors.border.focus.value}' },
    color: { value: '{colors.overlay.50.value}' },
  },
  _active: {
    backgroundColor: { value: '{colors.transparent.value}' },
  },
  _disabled: {
    backgroundColor: { value: '{colors.transparent.value}' },
    borderColor: { value: '{colors.border.secondary.value}' },
    color: { value: '{colors.font.disabled.value}' },
  },
  _pressed: {
    color: { value: '{colors.font.primary.value}' },
    backgroundColor: { value: '{colors.overlay.20.value}' },
    _hover: {
      backgroundColor: { value: '{colors.overlay.30.value}' },
    },
  },
  primary: {
    backgroundColor: { value: '{colors.transparent.value}' },
    borderWidth: { value: '{borderWidths.small.value}' },
    _focus: {
      borderColor: { value: '{colors.border.focus.value}' },
      backgroundColor: { value: '{colors.transparent.value}' },
      boxShadow: { value: '{components.fieldcontrol._focus.boxShadow.value}' },
      color: { value: '{colors.overlay.50.value}' },
    },
    _hover: {
      backgroundColor: { value: '{colors.overlay.10.value}' },
      color: { value: '{colors.overlay.50.value}' },
    },
    _disabled: {
      backgroundColor: { value: '{colors.background.tertiary.value}' },
      color: { value: '{colors.font.disabled.value}' },
    },
    _pressed: {
      backgroundColor: { value: '{colors.brand.primary.80.value}' },
      borderColor: { value: '{colors.brand.primary.80.value}' },
      color: { value: '{colors.white.value}' },
      _focus: {
        backgroundColor: {
          value: '{colors.border.focus.value}',
        },
        borderColor: { value: '{colors.border.focus.value}' },
      },
      _hover: {
        borderColor: { value: '{colors.brand.primary.60.value}' },
        backgroundColor: {
          value: '{colors.brand.primary.60.value}',
        },
      },
    },
  },
  link: {
    color: { value: '{colors.overlay.50.value}' },
    _hover: {
      backgroundColor: { value: '{colors.transparent.value}' },
      color: { value: '{colors.overlay.50.value}' },
    },
    _focus: {
      backgroundColor: { value: '{colors.transparent.value}' },
      color: { value: '{colors.overlay.50.value}' },
    },
    _disabled: {
      color: { value: '{colors.font.disabled.value}' },
    },
    _pressed: {
      backgroundColor: { value: '{colors.transparent.value}' },
      color: { value: '{colors.overlay.90.value}' },
      _hover: {
        backgroundColor: { value: '{colors.transparent.value}' },
      },
    },
  },
};
