import { DesignToken, WebDesignToken, ColorValue } from './types/designToken';
import { OrdinalScale, OrdinalVariation } from './types/scales';

type ScaleKeys = 10 | 20 | 40 | 60 | 80 | 90 | 100;

type ColorScale<DesignTokenType = DesignToken<ColorValue>> = {
  [key in ScaleKeys]: DesignTokenType;
};

type FontColors<DesignTokenType = DesignToken<ColorValue>> = {
  inverse: DesignTokenType;
  interactive: DesignTokenType;
  hover: DesignTokenType;
  focus: DesignTokenType;
  active: DesignTokenType;
  disabled: DesignTokenType;
} & OrdinalScale<DesignTokenType> &
  OrdinalVariation<DesignTokenType>;

type BackgroundColors<DesignTokenType = DesignToken<ColorValue>> = {
  disabled: DesignTokenType;
} & OrdinalScale<DesignTokenType> &
  OrdinalVariation<DesignTokenType>;

type BorderColors<DesignTokenType = DesignToken<ColorValue>> = {
  disabled: DesignTokenType;
  focus: DesignTokenType;
  error: DesignTokenType;
} & OrdinalScale<DesignTokenType>;

type ColorTypes<DesignTokenType = DesignToken<ColorValue>> =
  | { [key in ScaleKeys]: DesignTokenType }
  | FontColors
  | BackgroundColors
  | DesignTokenType
  | BorderColors;

type WebColorTypes = ColorTypes<WebDesignToken<ColorValue>>;

export type Colors = {
  // base color palette
  red: ColorScale;
  orange: ColorScale;
  yellow: ColorScale;
  green: ColorScale;
  teal: ColorScale;
  blue: ColorScale;
  purple: ColorScale;
  pink: ColorScale;
  neutral: ColorScale;
  white: DesignToken<ColorValue>;
  black: DesignToken<ColorValue>;

  // Semantic colors
  font: FontColors;
  background: BackgroundColors;
  border: BorderColors;
  brand: {
    primary: ColorScale;
    secondary: ColorScale;
  };

  [key: string]: ColorTypes | Record<string, ColorTypes>;
};

export type WebColors = {
  red: ColorScale<WebDesignToken<ColorValue>>;
  orange: ColorScale<WebDesignToken<ColorValue>>;
  yellow: ColorScale<WebDesignToken<ColorValue>>;
  green: ColorScale<WebDesignToken<ColorValue>>;
  teal: ColorScale<WebDesignToken<ColorValue>>;
  blue: ColorScale<WebDesignToken<ColorValue>>;
  purple: ColorScale<WebDesignToken<ColorValue>>;
  pink: ColorScale<WebDesignToken<ColorValue>>;
  neutral: ColorScale<WebDesignToken<ColorValue>>;
  white: WebDesignToken<ColorValue>;
  black: WebDesignToken<ColorValue>;

  font: FontColors<WebDesignToken<ColorValue>>;
  background: BackgroundColors<WebDesignToken<ColorValue>>;
  border: BorderColors<WebDesignToken<ColorValue>>;
  brand: {
    primary: ColorScale<WebDesignToken<ColorValue>>;
    secondary: ColorScale<WebDesignToken<ColorValue>>;
  };

  [key: string]: WebColorTypes | Record<string, WebColorTypes>;
};

export const colors: Colors = {
  red: {
    10: { value: 'hsl(0, 75%, 95%)' },
    20: { value: 'hsl(0, 75%, 85%)' },
    40: { value: 'hsl(0, 75%, 75%)' },
    60: { value: 'hsl(0, 50%, 50%)' },
    80: { value: 'hsl(0, 95%, 30%)' },
    90: { value: 'hsl(0, 100%, 20%)' },
    100: { value: 'hsl(0, 100%, 15%)' },
  },

  orange: {
    10: { value: 'hsl(30, 75%, 95%)' },
    20: { value: 'hsl(30, 75%, 85%)' },
    40: { value: 'hsl(30, 75%, 75%)' },
    60: { value: 'hsl(30, 50%, 50%)' },
    80: { value: 'hsl(30, 95%, 30%)' },
    90: { value: 'hsl(30, 100%, 20%)' },
    100: { value: 'hsl(30, 100%, 15%)' },
  },

  yellow: {
    10: { value: 'hsl(60, 75%, 95%)' },
    20: { value: 'hsl(60, 75%, 85%)' },
    40: { value: 'hsl(60, 75%, 75%)' },
    60: { value: 'hsl(60, 50%, 50%)' },
    80: { value: 'hsl(60, 95%, 30%)' },
    90: { value: 'hsl(60, 100%, 20%)' },
    100: { value: 'hsl(60, 100%, 15%)' },
  },

  green: {
    10: { value: 'hsl(130, 60%, 95%)' },
    20: { value: 'hsl(130, 60%, 90%)' },
    40: { value: 'hsl(130, 44%, 63%)' },
    60: { value: 'hsl(130, 43%, 46%)' },
    80: { value: 'hsl(130, 33%, 37%)' },
    90: { value: 'hsl(130, 27%, 29%)' },
    100: { value: 'hsl(130, 22%, 23%)' },
  },

  teal: {
    10: { value: 'hsl(190, 75%, 95%)' },
    20: { value: 'hsl(190, 75%, 85%)' },
    40: { value: 'hsl(190, 70%, 70%)' },
    60: { value: 'hsl(190, 50%, 50%)' },
    80: { value: 'hsl(190, 95%, 30%)' },
    90: { value: 'hsl(190, 100%, 20%)' },
    100: { value: 'hsl(190, 100%, 15%)' },
  },

  blue: {
    10: { value: 'hsl(220, 95%, 95%)' },
    20: { value: 'hsl(220, 85%, 85%)' },
    40: { value: 'hsl(220, 70%, 70%)' },
    60: { value: 'hsl(220, 50%, 50%)' },
    80: { value: 'hsl(220, 95%, 30%)' },
    90: { value: 'hsl(220, 100%, 20%)' },
    100: { value: 'hsl(220, 100%, 15%)' },
  },

  purple: {
    10: { value: 'hsl(300, 95%, 95%)' },
    20: { value: 'hsl(300, 85%, 85%)' },
    40: { value: 'hsl(300, 70%, 70%)' },
    60: { value: 'hsl(300, 50%, 50%)' },
    80: { value: 'hsl(300, 95%, 30%)' },
    90: { value: 'hsl(300, 100%, 20%)' },
    100: { value: 'hsl(300, 100%, 15%)' },
  },

  pink: {
    10: { value: 'hsl(340, 95%, 95%)' },
    20: { value: 'hsl(340, 90%, 85%)' },
    40: { value: 'hsl(340, 70%, 70%)' },
    60: { value: 'hsl(340, 50%, 50%)' },
    80: { value: 'hsl(340, 95%, 30%)' },
    90: { value: 'hsl(340, 100%, 20%)' },
    100: { value: 'hsl(340, 100%, 15%)' },
  },

  neutral: {
    10: { value: 'hsl(210, 5%, 98%)' },
    20: { value: 'hsl(210, 5%, 94%)' },
    40: { value: 'hsl(210, 5%, 87%)' },
    60: { value: 'hsl(210, 6%, 70%)' },
    80: { value: 'hsl(210, 10%, 40%)' },
    90: { value: 'hsl(210, 25%, 25%)' },
    100: { value: 'hsl(210, 50%, 10%)' },
  },

  brand: {
    primary: {
      10: { value: '{colors.teal.10.value}' },
      20: { value: '{colors.teal.20.value}' },
      40: { value: '{colors.teal.40.value}' },
      60: { value: '{colors.teal.60.value}' },
      80: { value: '{colors.teal.80.value}' },
      90: { value: '{colors.teal.90.value}' },
      100: { value: '{colors.teal.100.value}' },
    },
    secondary: {
      10: { value: '{colors.purple.10.value}' },
      20: { value: '{colors.purple.20.value}' },
      40: { value: '{colors.purple.40.value}' },
      60: { value: '{colors.purple.60.value}' },
      80: { value: '{colors.purple.80.value}' },
      90: { value: '{colors.purple.90.value}' },
      100: { value: '{colors.purple.100.value}' },
    },
  },

  font: {
    primary: { value: '{colors.neutral.100.value}' },
    secondary: { value: '{colors.neutral.90.value}' },
    tertiary: { value: '{colors.neutral.80.value}' },
    disabled: { value: '{colors.font.tertiary.value}' },
    inverse: { value: '{colors.white.value}' },

    interactive: { value: '{colors.brand.primary.80.value}' },
    // Hover and Focus colors are intentionally different colors.
    // This allows users to distinguish between the current keyboard focus
    // and the location of their pointer
    hover: { value: '{colors.brand.primary.90.value}' },
    // Focus color is set to 100 to ensure enough contrast for accessibility
    focus: { value: '{colors.brand.primary.100.value}' },
    active: { value: '{colors.brand.primary.100.value}' },

    info: { value: '{colors.blue.90.value}' },
    warning: { value: '{colors.orange.90.value}' },
    error: { value: '{colors.red.90.value}' },
    success: { value: '{colors.green.90.value}' },
  },

  background: {
    primary: { value: '{colors.white.value}' },
    secondary: { value: '{colors.neutral.10.value}' },
    tertiary: { value: '{colors.neutral.20.value}' },
    disabled: { value: '{colors.background.tertiary.value}' },

    info: { value: '{colors.blue.20.value}' },
    warning: { value: '{colors.orange.20.value}' },
    error: { value: '{colors.red.20.value}' },
    success: { value: '{colors.green.20.value}' },
  },

  border: {
    primary: { value: '{colors.neutral.60.value}' },
    secondary: { value: '{colors.neutral.40.value}' },
    tertiary: { value: '{colors.neutral.20.value}' },

    disabled: { value: '{colors.border.tertiary.value}' },
    // Focus color is set to 100 to ensure enough contrast for accessibility
    focus: { value: '{colors.brand.primary.100.value}' },
    error: { value: '{colors.red.80.value}' },
  },

  shadow: {
    primary: { value: 'hsla(210, 50%, 10%, 0.25)' },
    secondary: { value: 'hsla(210, 50%, 10%, 0.15)' },
    tertiary: { value: 'hsla(210, 50%, 10%, 0.05)' },
  },

  overlay: {
    10: { value: 'hsla(0, 0%, 0%, 0.1)' },
    20: { value: 'hsla(0, 0%, 0%, 0.2)' },
    30: { value: 'hsla(0, 0%, 0%, 0.3)' },
    40: { value: 'hsla(0, 0%, 0%, 0.4)' },
    50: { value: 'hsla(0, 0%, 0%, 0.5)' },
    60: { value: 'hsla(0, 0%, 0%, 0.6)' },
    70: { value: 'hsla(0, 0%, 0%, 0.7)' },
    80: { value: 'hsla(0, 0%, 0%, 0.8)' },
    90: { value: 'hsla(0, 0%, 0%, 0.9)' },
  },

  black: {
    value: 'hsl(0, 0%, 0%)',
  },
  white: { value: 'hsl(0, 0%, 100%)' },
  transparent: { value: 'transparent' },
};
