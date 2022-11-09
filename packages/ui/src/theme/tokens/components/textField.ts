import { DesignTokenProperties } from '../types/designToken';

export type TextFieldTokens<Output = unknown> = DesignTokenProperties<
  'color' | 'borderColor' | 'fontSize'
> & {
  _focus?: DesignTokenProperties<'borderColor', Output>;
};

export const textfield: TextFieldTokens = {
  color: { value: '{components.fieldcontrol.color.value}' },
  borderColor: { value: '{components.fieldcontrol.borderColor.value}' },
  fontSize: { value: '{components.fieldcontrol.fontSize.value}' },
  _focus: {
    borderColor: {
      value: '{components.fieldcontrol._focus.borderColor.value}',
    },
  },
};
