import { DesignToken } from './types/designToken';

export interface FontSizes {
  xxxs: DesignToken;
  xxs: DesignToken;
  xs: DesignToken;
  small: DesignToken;
  medium: DesignToken;
  large: DesignToken;
  xl: DesignToken;
  xxl: DesignToken;
  xxxl: DesignToken;
  xxxxl: DesignToken;
}

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
