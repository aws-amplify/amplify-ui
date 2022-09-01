import { BorderContrast, TextContrast } from '../types/designToken';

interface TextAreaFieldStateToken extends BorderContrast {}

export interface TextAreaFieldTokens extends BorderContrast, TextContrast {
  _focus: TextAreaFieldStateToken;
}

export const textareafield: TextAreaFieldTokens = {
  backgroundColor: { value: '{components.fieldcontrol.backgroundColor}' },
  color: { value: '{components.fieldcontrol.color.value}' },
  borderColor: { value: '{components.fieldcontrol.borderColor.value}' },
  _focus: {
    backgroundColor: {
      value: '{components.fieldcontrol._focus.backgroundColor}',
    },
    borderColor: {
      value: '{components.fieldcontrol._focus.borderColor.value}',
    },
  },
};
