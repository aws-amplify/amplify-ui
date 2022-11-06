import {
  DesignToken,
  WebDesignToken,
  FontWeightValue,
} from './types/designToken';

type FontWeight =
  | 'hairline'
  | 'thin'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

type DesignTokenValues<
  PropertyValueKey extends string | number,
  PropertyValue,
  OutputType = unknown
> = OutputType extends 'strict'
  ? Record<PropertyValueKey, WebDesignToken<PropertyValue>>
  : Partial<Record<PropertyValueKey, DesignToken<PropertyValue>>>;

export type FontWeights<OutputType = unknown> = DesignTokenValues<
  FontWeight,
  FontWeightValue,
  OutputType
>;
// export type FontWeights<OutputType = unknown> = OutputType extends 'required'
//   ? Record<FontWeight, WebDesignToken<FontWeightValue>>
//   : Partial<Record<FontWeight, DesignToken<FontWeightValue>>>;

// export type FontWeights<DesignTokenType = DesignToken<FontWeightValue>> =
//   Record<FontWeight, DesignTokenType>;

export type WebFontWeights = FontWeights<'strict'>;

export type ReactNativeFontWeights = FontWeights<string>;

export const fontWeights: FontWeights = {
  hairline: { value: 100 },
  thin: { value: 200 },
  light: { value: 300 },
  normal: { value: 400 },
  medium: { value: 500 },
  semibold: { value: 600 },
  bold: { value: 700 },
  extrabold: { value: 800 },
  black: { value: 900 },
};
