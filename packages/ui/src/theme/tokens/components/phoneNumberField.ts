import { DesignTokenProperties } from '../types/designToken';

export type PhoneNumberFieldTokens<Output = unknown> = DesignTokenProperties<
  'color' | 'borderColor' | 'fontSize',
  Output
> & {
  _focus?: DesignTokenProperties<'borderColor', Output>;
};

export const phonenumberfield = {
  color: { value: '{components.fieldcontrol.color}' },
  borderColor: { value: '{components.fieldcontrol.borderColor}' },
  fontSize: { value: '{components.fieldcontrol.fontSize}' },
  _focus: {
    borderColor: { value: '{components.fieldcontrol._focus.borderColor}' },
  },
};
