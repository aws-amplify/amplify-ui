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

export type FontWeights<DesignTokenType = DesignToken<FontWeightValue>> =
  Record<FontWeight, DesignTokenType>;

export type WebFontWeights = FontWeights<WebDesignToken<FontWeightValue>>;

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
