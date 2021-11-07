import {
  DesignToken,
  WebDesignToken,
  LineHeightValue,
} from './types/designToken';

export type LineHeights = {
  small: DesignToken<LineHeightValue>;
  medium: DesignToken<LineHeightValue>;
  large: DesignToken<LineHeightValue>;
};

export type WebLineHeights = {
  [Property in keyof LineHeights]: WebDesignToken<LineHeightValue>;
};

export const lineHeights: LineHeights = {
  small: { value: '1.5' },
  medium: { value: '1.75' },
  large: { value: '2' },
};
