import { DesignToken, WebDesignToken, RadiusValue } from './types/designToken';

type RadiusKeys = 'small' | 'medium' | 'large' | 'xl' | 'xxl' | 'xxl' | 'xxxl';

export type Radii = {
  [key in RadiusKeys]: DesignToken<RadiusValue>;
};

export type WebRadii = {
  [key in RadiusKeys]: WebDesignToken<RadiusValue>;
};

export const radii: Radii = {
  small: { value: '0.125rem' },
  medium: { value: '0.25rem' },
  large: { value: '1rem' },
  xl: { value: '2rem' },
  xxl: { value: '4rem' },
  xxxl: { value: '8rem' },
};
