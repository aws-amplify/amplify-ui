import { DesignToken, WebDesignToken, RadiusValue } from './types/designToken';

type RadiusSize = 'xs' | 'small' | 'medium' | 'large' | 'xl' | 'xxl' | 'xxxl';
export type Radii<DesignTokenType = DesignToken<RadiusValue> | RadiusValue> =
  Record<RadiusSize, DesignTokenType>;

export type WebRadii = Radii<WebDesignToken<RadiusValue>>;
export type ReactNativeRadii = Radii<number>;

export const radii: Radii = {
  xs: { value: '0.125rem' },
  small: { value: '0.25rem' },
  medium: { value: '0.5rem' },
  large: { value: '1rem' },
  xl: { value: '2rem' },
  xxl: { value: '4rem' },
  xxxl: { value: '8rem' },
};
