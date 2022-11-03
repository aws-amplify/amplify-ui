import { DesignToken, WebDesignToken, RadiusValue } from './types/designToken';

export type Radii = {
  xs: DesignToken<RadiusValue>;
  small: DesignToken<RadiusValue>;
  medium: DesignToken<RadiusValue>;
  large: DesignToken<RadiusValue>;
  xl: DesignToken<RadiusValue>;
  xxl: DesignToken<RadiusValue>;
  xxxl: DesignToken<RadiusValue>;
};

export type WebRadii = {
  [Property in keyof Radii]: WebDesignToken<RadiusValue>;
};

export type ReactNativeRadii = {
  [Property in keyof Radii]: number;
};

export const radii: Radii = {
  xs: { value: '0.125rem' },
  small: { value: '0.25rem' },
  medium: { value: '0.5rem' },
  large: { value: '1rem' },
  xl: { value: '2rem' },
  xxl: { value: '4rem' },
  xxxl: { value: '8rem' },
};
