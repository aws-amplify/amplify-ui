import { DesignTokenProperties } from '../types/designToken';

export type FieldGroupTokens<Output = unknown> = DesignTokenProperties<
  'gap',
  Output
> & {
  vertical?: DesignTokenProperties<'alignItems', Output>;
  outer?: DesignTokenProperties<'alignItems', Output>;
};

export const fieldgroup: FieldGroupTokens = {
  gap: { value: '{space.zero.value}' },
  vertical: {
    alignItems: { value: 'center' },
  },
  outer: {
    alignItems: { value: 'center' },
  },
};
