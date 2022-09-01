import {
  ColorValue,
  DesignToken,
  BorderContrast,
  FontSizeValue,
  TextContrast,
} from '../types/designToken';

interface PhoneNumberFieldFocusTokens extends BorderContrast {}
export interface PhoneNumberFieldTokens extends BorderContrast, TextContrast {
  fontSize: DesignToken<FontSizeValue>;
  _focus: PhoneNumberFieldFocusTokens;
}

export const phonenumberfield: PhoneNumberFieldTokens = {
  color: { value: '{components.fieldcontrol.color}' },
  backgroundColor: { value: '{components.selectfield.backgroundColor}' },
  borderColor: { value: '{components.fieldcontrol.borderColor}' },
  fontSize: { value: '{components.fieldcontrol.fontSize}' },
  _focus: {
    backgroundColor: {
      value: '{components.selectfield._focus.backgroundColor}',
    },
    borderColor: { value: '{components.fieldcontrol._focus.borderColor}' },
  },
};
