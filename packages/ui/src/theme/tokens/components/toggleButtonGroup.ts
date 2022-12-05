import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

type ToggleButtonGroupTokenKey =
  | 'alignItems'
  | 'alignContent'
  | 'justifyContent';

export type ToggleButtonGroupTokens<Output extends OutputVariantKey> =
  DesignTokenProperties<ToggleButtonGroupTokenKey, Output>;

export const togglebuttongroup: Required<ToggleButtonGroupTokens<'default'>> = {
  alignItems: { value: 'center' },
  alignContent: { value: 'center' },
  justifyContent: { value: 'flex-start' },
};
