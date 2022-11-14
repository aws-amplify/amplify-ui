import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

export type SelectFieldTokens<Output extends OutputVariantKey> =
  DesignTokenProperties<
    'borderColor' | 'color' | 'flexDirection' | 'fontSize',
    Output
  > & {
    _focus?: DesignTokenProperties<'borderColor', Output>;
    label?: DesignTokenProperties<'color', Output>;
  };

export const selectfield: Required<SelectFieldTokens<'default'>> = {
  borderColor: { value: '{components.fieldcontrol.borderColor}' },
  color: { value: '{components.fieldcontrol.color}' },
  flexDirection: {
    value: 'column',
  },
  fontSize: { value: '{components.fieldcontrol.fontSize}' },
  _focus: {
    borderColor: { value: '{components.fieldcontrol._focus.borderColor}' },
  },
  label: {
    color: { value: '{components.field.label.color}' },
  },
};
