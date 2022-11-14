import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

export type CheckboxFieldTokens<Output extends OutputVariantKey> =
  DesignTokenProperties<
    'alignItems' | 'alignContent' | 'flexDirection' | 'justifyContent',
    Output
  >;

export const checkboxfield: Required<CheckboxFieldTokens<'default'>> = {
  alignItems: { value: 'flex-start' },
  alignContent: { value: 'center' },
  flexDirection: { value: 'column' },
  justifyContent: { value: 'center' },
};
