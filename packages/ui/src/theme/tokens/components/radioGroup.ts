import {
  BackgroundColorValue,
  BorderColorValue,
  BorderWidthValue,
  ColorValue,
  DesignToken,
} from '../types/designToken';

export interface RadioGroupTokens {
  radio: {
    borderWidth: DesignToken<BorderWidthValue>;
    borderColor: DesignToken<BorderColorValue>;
    backgroundColor: DesignToken<BackgroundColorValue>;
    _checked: {
      color: DesignToken<ColorValue>;
    };
    label: {
      color: DesignToken<ColorValue>;
    };
  };
  label: {
    color: DesignToken<ColorValue>;
  };
}

export const radiogroup: RadioGroupTokens = {
  radio: {
    borderWidth: { value: '{components.radio.button.borderWidth}' },
    borderColor: { value: '{components.radio.button.borderColor}' },
    backgroundColor: { value: '{components.radio.button.backgroundColor}' },
    _checked: {
      color: { value: '{components.radio.button._checked.color}' },
    },
    label: {
      color: { value: '{components.radio.label.color}' },
    },
  },
  label: {
    color: { value: '{components.field.label.color}' },
  },
};
