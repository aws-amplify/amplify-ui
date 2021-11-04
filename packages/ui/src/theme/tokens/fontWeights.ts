import {
  DesignToken,
  WebDesignToken,
  FontWeightValue,
} from './types/designToken';

type FontWeightKeys =
  | 'hairline'
  | 'thin'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

export type FontWeights = {
  [key in FontWeightKeys]: DesignToken<FontWeightValue>;
};

export type WebFontWeights = {
  [key in FontWeightKeys]: WebDesignToken<FontWeightValue>;
};

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
