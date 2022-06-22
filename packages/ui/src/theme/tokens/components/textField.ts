import {
  ColorValue,
  DesignToken,
  BorderColorValue,
  FontSizeValue,
} from '../types/designToken';

interface TextFieldStateToken {
  borderColor: DesignToken<BorderColorValue>;
}

export interface TextFieldTokens {
  color: DesignToken<ColorValue>;
  borderColor: DesignToken<BorderColorValue>;
  fontSize: DesignToken<FontSizeValue>;
  _focus: TextFieldStateToken;
}

export const textfield: TextFieldTokens = {
  color: { value: '{components.fieldcontrol.color.value}' },
  borderColor: { value: '{components.fieldcontrol.borderColor.value}' },
  fontSize: { value: '{components.fieldcontrol.fontSize.value}' },
  _focus: {
    borderColor: {
      value: '{components.fieldcontrol._focus.borderColor.value}',
    },
  },
};
