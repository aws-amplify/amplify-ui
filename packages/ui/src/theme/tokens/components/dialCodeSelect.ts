import { DesignTokenProperties } from '../types/designToken';

export type DialCodeSelectTokens<Output = unknown> = DesignTokenProperties<
  'height',
  Output
>;

export const dialcodeselect: DialCodeSelectTokens = {
  height: {
    value: '{space.relative.full.value}',
  },
};
