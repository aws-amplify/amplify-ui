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
  borderColor: DesignToken<BorderColorValue>;
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
  borderColor: DesignToken<BorderColorValue>;
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
  color: DesignToken<ColorValue>;
}
interface TogglButtonPrimaryPressedHoverTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
  borderColor: DesignToken<BorderColorValue>;
  boxShadow: DesignToken<BoxShadowValue>;
  color: DesignToken<ColorValue>;
}

interface ToggleButtonLinkTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
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
  backgroundColor: DesignToken<BackgroundColorValue>;
  color: DesignToken<ColorValue>;
}

interface ToggleButtonLinkPressedTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
  color: DesignToken<ColorValue>;
  _focus: ToggleButtonLinkPressedFocusTokens;
  _hover: ToggleButtonLinkPressedHoverTokens;
}

interface ToggleButtonLinkPressedFocusTokens {
  color: DesignToken<ColorValue>;
  backgroundColor: DesignToken<BackgroundColorValue>;
}

interface ToggleButtonLinkPressedHoverTokens {
  color: DesignToken<ColorValue>;
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
  color: { value: '{colors.font.primary.value}' },
  _hover: {
    backgroundColor: { value: '{colors.overlay.10.value}' },
  },
  _focus: {
    borderColor: { value: '{colors.border.focus.value}' },
    color: { value: '{colors.font.primary.value}' },
  },
  _active: {
    backgroundColor: { value: '{colors.transparent.value}' },
  },
  _disabled: {
    backgroundColor: { value: '{colors.transparent.value}' },
    borderColor: { value: '{colors.border.disabled.value}' },
    color: { value: '{colors.font.disabled.value}' },
  },
  _pressed: {
    borderColor: { value: '{colors.border.pressed.value}' },
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
      color: { value: '{colors.font.primary.value}' },
    },
    _hover: {
      backgroundColor: { value: '{colors.overlay.10.value}' },
      color: { value: '{colors.font.primary.value}' },
    },
    _disabled: {
      borderColor: { value: '{colors.border.disabled.value}' },
      backgroundColor: { value: '{colors.background.disabled.value}' },
      color: { value: '{colors.font.disabled.value}' },
    },
    _pressed: {
      backgroundColor: { value: '{colors.brand.primary.80.value}' },
      borderColor: { value: '{colors.brand.primary.80.value}' },
      color: { value: '{colors.background.primary.value}' },
      _focus: {
        backgroundColor: {
          value: '{colors.border.focus.value}',
        },
        borderColor: { value: '{colors.border.focus.value}' },
        color: { value: '{colors.background.primary.value}' },
      },
      _hover: {
        borderColor: { value: '{colors.brand.primary.60.value}' },
        backgroundColor: {
          value: '{colors.brand.primary.60.value}',
        },
        boxShadow: { value: '{colors.brand.primary.60.value}' },
        color: { value: '{colors.background.primary.value}' },
      },
    },
  },
  link: {
    backgroundColor: { value: '{colors.transparent.value}' },
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
      backgroundColor: { value: '{colors.transparent.value}' },
      color: { value: '{colors.font.disabled.value}' },
    },
    _pressed: {
      backgroundColor: { value: '{colors.transparent.value}' },
      color: { value: '{colors.overlay.90.value}' },
      _focus: {
        backgroundColor: { value: '{colors.transparent.value}' },
        color: { value: '{colors.overlay.90.value}' },
      },
      _hover: {
        color: { value: '{colors.overlay.90.value}' },
        backgroundColor: { value: '{colors.transparent.value}' },
      },
    },
  },
};
