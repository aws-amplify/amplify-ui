import {
  ColorValue,
  DesignToken,
  BorderColorValue,
} from '../types/designToken';

interface TextFieldStateToken {
  borderColor: DesignToken<BorderColorValue>;
}

export interface TextFieldTokens {
  color: DesignToken<ColorValue>;
  borderColor: DesignToken<BorderColorValue>;
  _focus: TextFieldStateToken;
}

export const textfield: TextFieldTokens = {
  color: { value: '{components.fieldcontrol.color.value}' },
  borderColor: { value: '{components.fieldcontrol.borderColor.value}' },
  _focus: {
    borderColor: {
      value: '{components.fieldcontrol._focus.borderColor.value}',
    },
  },
};
