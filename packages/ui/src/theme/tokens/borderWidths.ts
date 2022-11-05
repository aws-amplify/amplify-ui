import {
  DesignToken,
  WebDesignToken,
  BorderWidthValue,
} from './types/designToken';

type BorderWidthSize = 'small' | 'medium' | 'large';

export type BorderWidths<
  DesignTokenType = DesignToken<BorderWidthValue> | BorderWidthValue
> = Record<BorderWidthSize, DesignTokenType>;

export type WebBorderWidths = BorderWidths<WebDesignToken<BorderWidthValue>>;

export const borderWidths: BorderWidths = {
  small: { value: '1px' },
  medium: { value: '2px' },
  large: { value: '3px' },
};
