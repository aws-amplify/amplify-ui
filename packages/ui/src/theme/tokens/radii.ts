import {
  DesignTokenValues,
  OutputVariantKey,
  RadiusValue,
} from './types/designToken';

type RadiusSize = 'xs' | 'small' | 'medium' | 'large' | 'xl' | 'xxl' | 'xxxl';

export type Radii<
  Output extends OutputVariantKey = unknown,
  Platform = unknown
> = DesignTokenValues<
  RadiusSize,
  RadiusValue<Platform, Output>,
  Output,
  Platform
>;

export const radii: Radii<'default'> = {
  xs: { value: '0.125rem' },
  small: { value: '0.25rem' },
  medium: { value: '0.5rem' },
  large: { value: '1rem' },
  xl: { value: '2rem' },
  xxl: { value: '4rem' },
  xxxl: { value: '8rem' },
};
