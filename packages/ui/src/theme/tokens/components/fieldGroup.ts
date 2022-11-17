import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

export type FieldGroupTokens<Output extends OutputVariantKey> =
  DesignTokenProperties<'gap', Output> & {
    vertical?: DesignTokenProperties<'alignItems', Output>;
    outer?: DesignTokenProperties<'alignItems', Output>;
  };

export const fieldgroup: Required<FieldGroupTokens<'default'>> = {
  gap: { value: '{space.zero.value}' },
  vertical: {
    alignItems: { value: 'center' },
  },
  outer: {
    alignItems: { value: 'center' },
  },
};
