import {
  DesignToken,
  WebDesignToken,
  BorderWidthValue,
} from './types/designToken';

export type BorderWidths = {
  /**
   * Small border, used for inputs and such
   */
  small: DesignToken<BorderWidthValue>;
  /**
   * Medium border, used for
   */
  medium: DesignToken<BorderWidthValue>;
  /**
   * Large border
   */
  large: DesignToken<BorderWidthValue>;
};

export type WebBorderWidths = {
  [Property in keyof BorderWidths]: WebDesignToken<BorderWidthValue>;
};

export const borderWidths: BorderWidths = {
  small: { value: '1px' },
  medium: { value: '2px' },
  large: { value: '3px' },
};
