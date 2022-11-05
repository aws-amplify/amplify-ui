import {
  DesignToken,
  WebDesignToken,
  OutlineWidthValue,
} from './types/designToken';

type OutlineWidthSize = 'small' | 'medium' | 'large';

export type OutlineWidths<
  DesignTokenType = DesignToken<OutlineWidthValue> | OutlineWidthValue
> = Record<OutlineWidthSize, DesignTokenType>;

export type WebOutlineWidths = OutlineWidths<WebDesignToken<OutlineWidthValue>>;

export const outlineWidths: OutlineWidths = {
  small: { value: '1px' },
  medium: { value: '2px' },
  large: { value: '3px' },
};
