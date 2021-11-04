import { DesignToken } from './types/designToken';

export interface Radii {
  xs: DesignToken;
  small: DesignToken;
  medium: DesignToken;
  large: DesignToken;
  xl: DesignToken;
  xxl: DesignToken;
  xxxl: DesignToken;
}

export const radii: Radii = {
  xs: { value: '0.125rem' },
  small: { value: '0.25rem' },
  medium: { value: '0.5rem' },
  large: { value: '1rem' },
  xl: { value: '2rem' },
  xxl: { value: '4rem' },
  xxxl: { value: '8rem' },
};
