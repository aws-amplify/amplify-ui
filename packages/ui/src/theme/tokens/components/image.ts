import { DesignTokenProperties } from '../types/designToken';

export interface ImageTokens
  extends DesignTokenProperties<
    'maxWidth' | 'height' | 'objectFit' | 'objectPosition'
  > {}

export const image: ImageTokens = {
  maxWidth: { value: '100%' },
  height: { value: 'auto' },
  objectFit: { value: 'initial' },
  objectPosition: { value: 'initial' },
};
