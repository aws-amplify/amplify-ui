import {
  DesignToken,
  WebDesignToken,
  BorderWidthValue,
} from './types/designToken';

type Sizes = 'small' | 'medium' | 'large';

export type BorderWidths = {
  [key in Sizes]: DesignToken<BorderWidthValue>;
};

export type WebBorderWidths = {
  [key in Sizes]: WebDesignToken<BorderWidthValue>;
};

export const borderWidths: BorderWidths = {
  small: { value: '1px' },
  medium: { value: '2px' },
  large: { value: '3px' },
};
