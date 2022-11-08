import { DesignTokenProperties } from '../types/designToken';

export interface IconTokens
  extends DesignTokenProperties<'height' | 'lineHeight'> {}

export const icon: IconTokens = {
  lineHeight: { value: 1 },
  height: { value: '1em' }, // Should match height of parent container font-size
};
