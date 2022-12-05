import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

export type TextFieldTokens<Output extends OutputVariantKey> =
  DesignTokenProperties<'color' | 'borderColor' | 'fontSize', Output> & {
    _focus?: DesignTokenProperties<'borderColor', Output>;
  };

export const textfield: Required<TextFieldTokens<'default'>> = {
  color: { value: '{components.fieldcontrol.color.value}' },
  borderColor: { value: '{components.fieldcontrol.borderColor.value}' },
  fontSize: { value: '{components.fieldcontrol.fontSize.value}' },
  _focus: {
    borderColor: {
      value: '{components.fieldcontrol._focus.borderColor.value}',
    },
  },
};
