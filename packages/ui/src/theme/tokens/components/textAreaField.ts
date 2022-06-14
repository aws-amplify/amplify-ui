import {
  ColorValue,
  DesignToken,
  BorderColorValue,
} from '../types/designToken';

interface TextAreaFieldStateToken {
  borderColor: DesignToken<BorderColorValue>;
}

export interface TextAreaFieldTokens {
  color: DesignToken<ColorValue>;
  borderColor: DesignToken<BorderColorValue>;
  _focus: TextAreaFieldStateToken;
}

export const textareafield: TextAreaFieldTokens = {
  color: { value: '{components.fieldcontrol.color.value}' },
  borderColor: { value: '{components.fieldcontrol.borderColor.value}' },
  _focus: {
    borderColor: {
      value: '{components.fieldcontrol._focus.borderColor.value}',
    },
  },
};
