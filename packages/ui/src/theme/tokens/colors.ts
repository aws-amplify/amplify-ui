import {
  ColorValue,
  DesignTokenValues,
  OutputVariantKey,
} from './types/designToken';

/**
 * Util type for creating color interfaces using `ColorValue` from string and number unions
 */
type BaseColorValues<
  VariantKey extends string | number,
  Output,
  Platform = unknown
> = DesignTokenValues<VariantKey, ColorValue, Output, Platform>;

type ColorValues<
  VariantKey extends string | number,
  Output,
  Platform = unknown
> = Output extends 'required' | 'default'
  ? BaseColorValues<VariantKey, Output, Platform>
  : Partial<BaseColorValues<VariantKey, Output, Platform>>;

/**
 * Util type for creating nested color scale interfaces from variant keys
 */
type BaseColorValueScale<
  VariantKey extends string | number,
  Output,
  Platform = unknown
> = Record<VariantKey, ColorValues<ScaleKey, Output, Platform>>;

type ColorValueScale<
  VariantKey extends string | number,
  Output,
  Platform = unknown
> = Output extends 'required' | 'default'
  ? BaseColorValueScale<VariantKey, Output, Platform>
  : Partial<BaseColorValueScale<VariantKey, Output, Platform>>;

// scale keys
type ScaleKey = 10 | 20 | 40 | 60 | 80 | 90 | 100;
type OverlayKey = 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;

// color palettes
type ColorPaletteKey =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'neutral';
type GreyscalePaletteKey = 'white' | 'black' | 'transparent';

// variant keys
type OrderVariant = 'primary' | 'secondary' | 'tertiary';
type OrderVariantKey<Output = unknown> = Output extends 'default'
  ? Exclude<OrderVariant, 'quaternary'>
  : OrderVariant;

type InformationVariantKey = 'info' | 'warning' | 'error' | 'success';

type WebStateVariantKey =
  | 'active'
  | 'disabled'
  | 'error'
  | 'hover'
  | 'focus'
  | 'pressed';
type ReactNativeStateVariantKey = Exclude<
  WebStateVariantKey,
  'focused' | 'hover'
>;

type StateVariantKey<Platform> = Platform extends 'react-native'
  ? ReactNativeStateVariantKey
  : WebStateVariantKey;

type BrandVariantKey = Extract<OrderVariantKey, 'primary' | 'secondary'>;
type FontVariantKey<Output, Platform> =
  | 'inverse'
  | 'interactive'
  | Extract<
      StateVariantKey<Platform>,
      'active' | 'disabled' | 'hover' | 'focus'
    >
  | OrderVariantKey<Output>
  | InformationVariantKey;

type BackgroundColorKey<Platform> =
  | Extract<StateVariantKey<Platform>, 'disabled'>
  | OrderVariantKey
  | InformationVariantKey
  | 'quaternary';

type BorderColorKey<Output, Platform> =
  | Extract<StateVariantKey<Platform>, 'disabled' | 'error'>
  | OrderVariantKey<Output>
  | (Output extends 'default'
      ? // currently excludes `active` and 'hover' for `default` because there are no defaults for them
        Exclude<StateVariantKey<Platform>, 'active' | 'hover'>
      : StateVariantKey<Platform>);

type PaletteValues<Output, Platform> = ColorValueScale<
  ColorPaletteKey,
  Output,
  Platform
>;

type GreyscaleColors<Output, Platform> = ColorValues<
  GreyscalePaletteKey,
  Output,
  Platform
>;

// `Colors` tokens requires special handling for `required` output due to nested tokens
type BaseColors<
  Output extends OutputVariantKey = unknown,
  Platform = unknown
> = PaletteValues<Output, Platform> &
  GreyscaleColors<Output, Platform> & {
    // brand properties have scaled values
    brand?: ColorValueScale<BrandVariantKey, Output, Platform>;

    background?: ColorValues<BackgroundColorKey<Platform>, Output, Platform>;
    border?: ColorValues<BorderColorKey<Output, Platform>, Output, Platform>;
    font?: ColorValues<FontVariantKey<Output, Platform>, Output, Platform>;
    overlay?: ColorValues<OverlayKey, Output, Platform>;
    shadow?: ColorValues<OrderVariantKey, Output, Platform>;
  };

export type Colors<
  Output extends OutputVariantKey = unknown,
  Platform = unknown
> = (Output extends 'required' | 'default'
  ? Required<BaseColors<Output, Platform>>
  : BaseColors<Output, Platform>) &
  Record<string, any>; // TODO: remove 'any' and created structured custom color generic

export const colors: Colors<'default'> = {
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
    60: { value: 'hsl(210, 10%, 58%)' },
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
    disabled: { value: '{colors.neutral.60.value}' },
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
    quaternary: { value: '{colors.neutral.60.value}' },
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

    pressed: { value: '{colors.brand.primary.100.value}' },
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

  black: { value: 'hsl(0, 0%, 0%)' },
  white: { value: 'hsl(0, 0%, 100%)' },
  transparent: { value: 'transparent' },
};
