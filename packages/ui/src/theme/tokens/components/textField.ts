import {
  DesignToken,
  BorderContrast,
  FontSizeValue,
  TextContrast,
} from '../types/designToken';

interface TextFieldStateToken extends BorderContrast {}

export interface TextFieldTokens extends BorderContrast, TextContrast {
  fontSize: DesignToken<FontSizeValue>;
  _focus: TextFieldStateToken;
}

export const textfield: TextFieldTokens = {
  backgroundColor: { value: '{components.fieldcontrol.backgroundColor}' },
  color: { value: '{components.fieldcontrol.color.value}' },
  borderColor: { value: '{components.fieldcontrol.borderColor.value}' },
  fontSize: { value: '{components.fieldcontrol.fontSize.value}' },
  _focus: {
    backgroundColor: {
      value: '{components.fieldcontrol._focus.backgroundColor}',
    },
    borderColor: {
      value: '{components.fieldcontrol._focus.borderColor.value}',
    },
  },
};
