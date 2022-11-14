import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

export type IconTokens<Output extends OutputVariantKey> = DesignTokenProperties<
  'height' | 'lineHeight',
  Output
>;

export const icon: Required<IconTokens<'default'>> = {
  lineHeight: { value: 1 },
  height: { value: '1em' }, // Should match height of parent container font-size
};
