import { DesignTokenProperties } from '../types/designToken';

export type IconTokens<Output = unknown> = DesignTokenProperties<
  'height' | 'lineHeight',
  Output
>;

export const icon: IconTokens = {
  lineHeight: { value: 1 },
  height: { value: '1em' }, // Should match height of parent container font-size
};
