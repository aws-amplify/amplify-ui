import { DesignTokenProperties } from '../types/designToken';

export type CheckboxFieldTokens<Output = unknown> = DesignTokenProperties<
  'alignItems' | 'alignContent' | 'flexDirection' | 'justifyContent',
  Output
>;

export const checkboxfield: CheckboxFieldTokens = {
  alignItems: { value: 'flex-start' },
  alignContent: { value: 'center' },
  flexDirection: { value: 'column' },
  justifyContent: { value: 'center' },
};
