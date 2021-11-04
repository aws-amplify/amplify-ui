import {
  DesignToken,
  WebDesignToken,
  LineHeightValue,
} from './types/designToken';

type Keys = 'small' | 'medium' | 'large';

export type LineHeights = {
  [key in Keys]: DesignToken<LineHeightValue>;
};

export type WebLineHeights = {
  [key in Keys]: WebDesignToken<LineHeightValue>;
};

export const lineHeights: LineHeights = {
  small: { value: '1.5' },
  medium: { value: '1.75' },
  large: { value: '2' },
};
