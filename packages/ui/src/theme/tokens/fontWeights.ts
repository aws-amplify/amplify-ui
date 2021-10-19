import { DesignToken } from './types/designToken';

export interface FontWeights {
  hairline: DesignToken;
  thin: DesignToken;
  light: DesignToken;
  normal: DesignToken;
  medium: DesignToken;
  semibold: DesignToken;
  bold: DesignToken;
  extrabold: DesignToken;
  black: DesignToken;
}

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
