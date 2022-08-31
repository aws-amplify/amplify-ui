import {
  ColorValue,
  DesignToken,
  BorderColorValue,
  BorderContrast,
  TextContrast,
} from '../types/designToken';

interface TextAreaFieldStateToken extends BorderContrast {}

export interface TextAreaFieldTokens extends BorderContrast, TextContrast {
  _focus: TextAreaFieldStateToken;
}

export const textareafield: TextAreaFieldTokens = {
  backgroundColor: { value: 'transparent' },
  color: { value: '{components.fieldcontrol.color.value}' },
  borderColor: { value: '{components.fieldcontrol.borderColor.value}' },
  _focus: {
    backgroundColor: { value: 'transparent' },
    borderColor: {
      value: '{components.fieldcontrol._focus.borderColor.value}',
    },
  },
};
