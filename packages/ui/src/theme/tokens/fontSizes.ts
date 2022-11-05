import {
  DesignToken,
  WebDesignToken,
  FontSizeValue,
} from './types/designToken';

type FontSize =
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

export type FontSizes<
  DesignTokenType = DesignToken<FontSizeValue> | FontSizeValue
> = Record<FontSize, DesignTokenType>;

export type WebFontSizes = FontSizes<WebDesignToken<FontSizeValue>>;

export type ReactNativeFontSizes = Omit<FontSizes<number>, 'xxxs' | 'xxxxl'>;

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
