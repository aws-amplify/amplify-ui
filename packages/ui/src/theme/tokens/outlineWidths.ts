import {
  DesignToken,
  WebDesignToken,
  OutlineWidthValue,
} from './types/designToken';

export type OutlineWidths = {
  small: DesignToken<OutlineWidthValue>;
  medium: DesignToken<OutlineWidthValue>;
  large: DesignToken<OutlineWidthValue>;
};

export type WebOutlineWidths = {
  [Property in keyof OutlineWidths]: WebDesignToken<OutlineWidthValue>;
};

export const outlineWidths: OutlineWidths = {
  small: { value: '1px' },
  medium: { value: '2px' },
  large: { value: '3px' },
};
