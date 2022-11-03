import {
  DesignToken,
  WebDesignToken,
  FontWeightValue,
} from './types/designToken';

export type FontWeights = {
  hairline: DesignToken<FontWeightValue>;
  thin: DesignToken<FontWeightValue>;
  light: DesignToken<FontWeightValue>;
  normal: DesignToken<FontWeightValue>;
  medium: DesignToken<FontWeightValue>;
  semibold: DesignToken<FontWeightValue>;
  bold: DesignToken<FontWeightValue>;
  extrabold: DesignToken<FontWeightValue>;
  black: DesignToken<FontWeightValue>;
};

export type WebFontWeights = {
  [Property in keyof FontWeights]: WebDesignToken<FontWeightValue>;
};

export type ReactNativeFontWeights = {
  [Property in keyof FontWeights]: string;
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
