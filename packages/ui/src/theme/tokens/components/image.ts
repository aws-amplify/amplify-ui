import { DesignTokenProperties } from '../types/designToken';

export type ImageTokens<Output = unknown> = DesignTokenProperties<
  'maxWidth' | 'height' | 'objectFit' | 'objectPosition',
  Output
>;

export const image: ImageTokens = {
  maxWidth: { value: '100%' },
  height: { value: 'auto' },
  objectFit: { value: 'initial' },
  objectPosition: { value: 'initial' },
};
