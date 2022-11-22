import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

export type ImageTokens<Output extends OutputVariantKey> =
  DesignTokenProperties<
    'maxWidth' | 'height' | 'objectFit' | 'objectPosition',
    Output
  >;

export const image: Required<ImageTokens<'default'>> = {
  maxWidth: { value: '100%' },
  height: { value: 'auto' },
  objectFit: { value: 'initial' },
  objectPosition: { value: 'initial' },
};
