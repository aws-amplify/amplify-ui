import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

export type FlexTokens<Output extends OutputVariantKey> = DesignTokenProperties<
  'gap' | 'justifyContent' | 'alignItems' | 'alignContent' | 'flexWrap',
  Output
>;

export const flex: Required<FlexTokens<'default'>> = {
  gap: { value: '{space.medium.value}' },
  justifyContent: { value: 'normal' },
  alignItems: { value: 'stretch' },
  alignContent: { value: 'normal' },
  flexWrap: { value: 'nowrap' },
};
