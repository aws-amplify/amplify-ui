import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

export type PhoneNumberFieldTokens<Output extends OutputVariantKey> =
  DesignTokenProperties<'color' | 'borderColor' | 'fontSize', Output> & {
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
