import { DesignTokenProperties } from '../types/designToken';

export type TextAreaFieldTokens<Output = unknown> = DesignTokenProperties<
  'color' | 'borderColor' | 'fontSize'
> & {
  _focus?: DesignTokenProperties<'borderColor', Output>;
};

export const textareafield: TextAreaFieldTokens = {
  color: { value: '{components.fieldcontrol.color.value}' },
  borderColor: { value: '{components.fieldcontrol.borderColor.value}' },
  _focus: {
    borderColor: {
      value: '{components.fieldcontrol._focus.borderColor.value}',
    },
  },
};
