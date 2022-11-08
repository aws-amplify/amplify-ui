import { DesignTokenValues, FontWeightValue } from './types/designToken';

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
  Output = unknown,
  Platform = unknown
> = DesignTokenValues<FontWeight, FontWeightValue, Output, Platform>;

export type ReactNativeFontWeights = FontWeights<unknown, 'mobile'>;

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
