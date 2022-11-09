import { DesignTokenProperties } from '../types/designToken';

type ToggleButtonGroupTokenKey =
  | 'alignItems'
  | 'alignContent'
  | 'justifyContent';

export type ToggleButtonGroupTokens<OutputType = unknown> =
  DesignTokenProperties<ToggleButtonGroupTokenKey, OutputType> & {};

export const togglebuttongroup: ToggleButtonGroupTokens = {
  alignItems: { value: 'center' },
  alignContent: { value: 'center' },
  justifyContent: { value: 'flex-start' },
};
