import {
  ColorValue,
  DesignToken,
  BorderColorValue,
  FontSizeValue,
} from '../types/designToken';

export interface PhoneNumberFieldTokens {
  color: DesignToken<ColorValue>;
  borderColor: DesignToken<BorderColorValue>;
  fontSize: DesignToken<FontSizeValue>;
  _focus: {
    borderColor: DesignToken<BorderColorValue>;
  };
}

export const phonenumberfield = {
  color: { value: '{components.fieldcontrol.color}' },
  borderColor: { value: '{components.fieldcontrol.borderColor}' },
  fontSize: { value: '{components.fieldcontrol.fontSize}' },
  _focus: {
    borderColor: { value: '{components.fieldcontrol._focus.borderColor}' },
  },
};
