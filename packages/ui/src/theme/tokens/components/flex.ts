import { DesignTokenProperties } from '../types/designToken';

export type FlexTokens<Output = unknown> = DesignTokenProperties<
  'gap' | 'justifyContent' | 'alignItems' | 'alignContent' | 'flexWrap',
  Output
>;

export const flex: FlexTokens = {
  gap: { value: '{space.medium.value}' },
  justifyContent: { value: 'normal' },
  alignItems: { value: 'stretch' },
  alignContent: { value: 'normal' },
  flexWrap: { value: 'nowrap' },
};
