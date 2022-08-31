import {
  ColorValue,
  DesignToken,
  BorderColorValue,
  BorderContrast,
  FontSizeValue,
} from '../types/designToken';

interface PhoneNumberFieldFocusTokens extends BorderContrast {}
export interface PhoneNumberFieldTokens extends BorderContrast {
  color: DesignToken<ColorValue>;
  fontSize: DesignToken<FontSizeValue>;
  _focus: PhoneNumberFieldFocusTokens;
}

export const phonenumberfield: PhoneNumberFieldTokens = {
  color: { value: '{components.fieldcontrol.color}' },
  backgroundColor: { value: 'transparent' },
  borderColor: { value: '{components.fieldcontrol.borderColor}' },
  fontSize: { value: '{components.fieldcontrol.fontSize}' },
  _focus: {
    backgroundColor: { value: 'transparent' },
    borderColor: { value: '{components.fieldcontrol._focus.borderColor}' },
  },
};
