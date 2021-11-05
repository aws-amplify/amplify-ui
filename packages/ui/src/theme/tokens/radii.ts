import { DesignToken } from './types/designToken';

export interface Radii {
  small: DesignToken;
  medium: DesignToken;
  large: DesignToken;
  xl: DesignToken;
  xxl: DesignToken;
  xxxl: DesignToken;
}

export const radii: Radii = {
  small: { value: '0' },
  medium: { value: '0.25rem' },
  large: { value: '1rem' },
  xl: { value: '2rem' },
  xxl: { value: '4rem' },
  xxxl: { value: '8rem' },
};
