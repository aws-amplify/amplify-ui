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

export type FontWeights<
  DesignTokenType = DesignToken<FontWeightValue> | string | number
> = Record<FontWeight, DesignTokenType>;

export type WebFontWeights = FontWeights<WebDesignToken<FontWeightValue>>;

type ReactNativeFontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | undefined;
export type ReactNativeFontWeights = FontWeights<ReactNativeFontWeight>;

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
