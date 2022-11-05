import {
  DesignToken,
  WebDesignToken,
  LineHeightValue,
} from './types/designToken';

type LineHeightSize = 'small' | 'medium' | 'large';

export type LineHeights<
  DesignTokenType = DesignToken<LineHeightValue> | LineHeightValue
> = Record<LineHeightSize, DesignTokenType>;

export type WebLineHeights = LineHeights<WebDesignToken<LineHeightValue>>;

export const lineHeights: LineHeights = {
  small: { value: '1.25' },
  medium: { value: '1.5' },
  large: { value: '2' },
};
