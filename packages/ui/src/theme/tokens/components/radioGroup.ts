import {
  BackgroundColorValue,
  BorderColorValue,
  BorderWidthValue,
  ColorValue,
  DesignToken,
  TextContrast,
} from '../types/designToken';

interface RadioCheckedTokens extends TextContrast {}

interface RadioLabelTokens extends TextContrast {}
export interface RadioGroupTokens {
  radio: {
    borderWidth: DesignToken<BorderWidthValue>;
    borderColor: DesignToken<BorderColorValue>;
    backgroundColor: DesignToken<BackgroundColorValue>;
    _checked: RadioCheckedTokens;
    label: RadioLabelTokens;
  };
  label: RadioLabelTokens;
}

export const radiogroup: RadioGroupTokens = {
  radio: {
    borderWidth: { value: '{components.radio.button.borderWidth}' },
    borderColor: { value: '{components.radio.button.borderColor}' },
    backgroundColor: { value: '{components.radio.button.backgroundColor}' },
    _checked: {
      backgroundColor: { value: 'transparent' },
      color: { value: '{components.radio.button._checked.color}' },
    },
    label: {
      backgroundColor: { value: 'transparent' },
      color: { value: '{components.radio.label.color}' },
    },
  },
  label: {
    backgroundColor: { value: 'transparent' },
    color: { value: '{components.field.label.color}' },
  },
};
