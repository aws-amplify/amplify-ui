import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

export type DialCodeSelectTokens<Output extends OutputVariantKey> =
  DesignTokenProperties<'height', Output>;

export const dialcodeselect: Required<DialCodeSelectTokens<'default'>> = {
  height: {
    value: '{space.relative.full.value}',
  },
};
