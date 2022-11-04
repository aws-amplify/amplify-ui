import {
  DesignToken,
  WebDesignToken,
  FontSizeValue,
} from './types/designToken';

export type FontSizes = {
  xxxs: DesignToken<FontSizeValue>;
  xxs: DesignToken<FontSizeValue>;
  xs: DesignToken<FontSizeValue>;
  small: DesignToken<FontSizeValue>;
  medium: DesignToken<FontSizeValue>;
  large: DesignToken<FontSizeValue>;
  xl: DesignToken<FontSizeValue>;
  xxl: DesignToken<FontSizeValue>;
  xxxl: DesignToken<FontSizeValue>;
  xxxxl: DesignToken<FontSizeValue>;
};

export type WebFontSizes = {
  [Property in keyof FontSizes]: WebDesignToken<FontSizeValue>;
};

export type ReactNativeFontSizes = {
  [Property in keyof Omit<FontSizes, 'xxxs' | 'xxxxl'>]: number;
};

export const fontSizes: FontSizes = {
  xxxs: { value: '0.375rem' },
  xxs: { value: '0.5rem' },
  xs: { value: '0.75rem' },
  small: { value: '0.875rem' },
  medium: { value: '1rem' },
  large: { value: '1.25rem' },
  xl: { value: '1.5rem' },
  xxl: { value: '2rem' },
  xxxl: { value: '2.5rem' },
  xxxxl: { value: '3rem' },
};
