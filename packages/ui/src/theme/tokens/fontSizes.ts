import {
  DesignToken,
  WebDesignToken,
  FontSizeValue,
} from './types/designToken';

type FontSizeKeys =
  | 'xxxs'
  | 'xxs'
  | 'xs'
  | 'small'
  | 'medium'
  | 'large'
  | 'xl'
  | 'xxl'
  | 'xxxl'
  | 'xxxxl';

export type FontSizes = {
  [key in FontSizeKeys]: DesignToken<FontSizeValue>;
};

export type WebFontSizes = {
  [key in FontSizeKeys]: WebDesignToken<FontSizeValue>;
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
  xxxl: { value: '3rem' },
  xxxxl: { value: '5rem' },
};
