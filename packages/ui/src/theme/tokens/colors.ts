import { DesignToken, WebDesignToken, ColorValue } from './types/designToken';
import { OrdinalScaleKeys, OrdinalVariationKeys } from './types/scales';

type ScaleKeys = 10 | 20 | 40 | 60 | 80 | 90 | 100;
type FontKeys =
  | 'inverse'
  | 'interactive'
  | 'hover'
  | 'focus'
  | 'active'
  | 'disabled';

type FontColors = {
  [key in
    | OrdinalScaleKeys
    | OrdinalVariationKeys
    | FontKeys]: DesignToken<ColorValue>;
};

type BackgroundColors = {
  [key in
    | OrdinalScaleKeys
    | OrdinalVariationKeys
    | 'disabled']: DesignToken<ColorValue>;
};

type BorderColors = {
  [key in
    | OrdinalScaleKeys
    | 'disabled'
    | 'focus'
    | 'error']: DesignToken<ColorValue>;
};

type ColorTypes =
  | { [key in ScaleKeys]: DesignToken<ColorValue> }
  | FontColors
  | BackgroundColors
  | DesignToken<ColorValue>
  | BorderColors;

export type Colors = {
  // base color palette
  red: { [key in ScaleKeys]: DesignToken<ColorValue> };
  orange: { [key in ScaleKeys]: DesignToken<ColorValue> };
  yellow: { [key in ScaleKeys]: DesignToken<ColorValue> };
  green: { [key in ScaleKeys]: DesignToken<ColorValue> };
  teal: { [key in ScaleKeys]: DesignToken<ColorValue> };
  blue: { [key in ScaleKeys]: DesignToken<ColorValue> };
  purple: { [key in ScaleKeys]: DesignToken<ColorValue> };
  pink: { [key in ScaleKeys]: DesignToken<ColorValue> };
  neutral: { [key in ScaleKeys]: DesignToken<ColorValue> };
  white: DesignToken<ColorValue>;
  black: DesignToken<ColorValue>;

  // Semantic colors
  font: FontColors;
  background: BackgroundColors;
  border: BorderColors;
  brand: {
    primary: { [key in ScaleKeys]: DesignToken<ColorValue> };
    secondary: { [key in ScaleKeys]: DesignToken<ColorValue> };
  };

  [key: string]: ColorTypes | Record<string, ColorTypes>;
};

export type WebColors = {
  red: { [key in ScaleKeys]: WebDesignToken<ColorValue> };
  orange: { [key in ScaleKeys]: WebDesignToken<ColorValue> };
  yellow: { [key in ScaleKeys]: WebDesignToken<ColorValue> };
  green: { [key in ScaleKeys]: WebDesignToken<ColorValue> };
  teal: { [key in ScaleKeys]: WebDesignToken<ColorValue> };
  blue: { [key in ScaleKeys]: WebDesignToken<ColorValue> };
  purple: { [key in ScaleKeys]: WebDesignToken<ColorValue> };
  pink: { [key in ScaleKeys]: WebDesignToken<ColorValue> };
  neutral: { [key in ScaleKeys]: WebDesignToken<ColorValue> };
  white: WebDesignToken<ColorValue>;
  black: WebDesignToken<ColorValue>;

  font: { [Property in keyof Colors['font']]: WebDesignToken<ColorValue> };
  background: {
    [Property in keyof Colors['background']]: WebDesignToken<ColorValue>;
  };
  border: { [Property in keyof Colors['border']]: WebDesignToken<ColorValue> };
  brand: {
    primary: { [key in ScaleKeys]: WebDesignToken<ColorValue> };
    secondary: { [key in ScaleKeys]: WebDesignToken<ColorValue> };
  };

  [key: string]: ColorTypes | Record<string, ColorTypes>;
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
    10: { value: 'hsl(130, 75%, 95%)' },
    20: { value: 'hsl(130, 75%, 85%)' },
    40: { value: 'hsl(130, 75%, 75%)' },
    60: { value: 'hsl(130, 50%, 50%)' },
    80: { value: 'hsl(130, 95%, 30%)' },
    90: { value: 'hsl(130, 100%, 20%)' },
    100: { value: 'hsl(130, 100%, 15%)' },
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
    10: { value: 'hsl(210, 5%, 95%)' },
    20: { value: 'hsl(210, 5%, 90%)' },
    40: { value: 'hsl(210, 5%, 80%)' },
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
    secondary: { value: '{colors.neutral.80.value}' },
    tertiary: { value: '{colors.neutral.60.value}' },
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

    info: { value: '{colors.blue.80.value}' },
    warning: { value: '{colors.orange.80.value}' },
    error: { value: '{colors.red.80.value}' },
    success: { value: '{colors.green.80.value}' },
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
