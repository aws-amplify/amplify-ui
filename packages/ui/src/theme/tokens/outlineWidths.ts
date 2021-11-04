import {
  DesignToken,
  WebDesignToken,
  OutlineWidthValue,
} from './types/designToken';

type OutlineWidthKeys = 'small' | 'medium' | 'large';

export type OutlineWidths = {
  [key in OutlineWidthKeys]: DesignToken<OutlineWidthValue>;
};

export type WebOutlineWidths = {
  [key in OutlineWidthKeys]: WebDesignToken<OutlineWidthValue>;
};

export const outlineWidths: OutlineWidths = {
  small: { value: '1px' },
  medium: { value: '2px' },
  large: { value: '3px' },
};
