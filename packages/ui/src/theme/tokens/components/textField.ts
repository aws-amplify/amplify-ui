import {
  ColorValue,
  DesignToken,
  BorderColorValue,
  BorderContrast,
  FontSizeValue,
  TextContrast,
} from '../types/designToken';

interface TextFieldStateToken extends BorderContrast {
  borderColor: DesignToken<BorderColorValue>;
}

export interface TextFieldTokens extends BorderContrast, TextContrast {
  color: DesignToken<ColorValue>;
  borderColor: DesignToken<BorderColorValue>;
  fontSize: DesignToken<FontSizeValue>;
  _focus: TextFieldStateToken;
}

export const textfield: TextFieldTokens = {
  backgroundColor: { value: 'transparent' },
  color: { value: '{components.fieldcontrol.color.value}' },
  borderColor: { value: '{components.fieldcontrol.borderColor.value}' },
  fontSize: { value: '{components.fieldcontrol.fontSize.value}' },
  _focus: {
    backgroundColor: { value: 'transparent' },
    borderColor: {
      value: '{components.fieldcontrol._focus.borderColor.value}',
    },
  },
};
