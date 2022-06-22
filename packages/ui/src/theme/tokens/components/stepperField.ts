import {
  ColorValue,
  DesignToken,
  FontSizeValue,
  FlexDirectionValue,
  TextAlignValue,
  BorderColorValue,
} from '../types/designToken';

interface StepperFieldInputTokens {
  textAlign: DesignToken<TextAlignValue>;
  color: DesignToken<ColorValue>;
  fontSize: DesignToken<FontSizeValue>;
}

interface ButtonStateColorTokens {
  color: DesignToken<ColorValue>;
  backgroundColor: DesignToken<ColorValue>;
}

export interface StepperFieldTokens {
  borderColor: DesignToken<BorderColorValue>;
  flexDirection: DesignToken<FlexDirectionValue>;
  input: StepperFieldInputTokens;
  button: {
    color: DesignToken<ColorValue>;
    backgroundColor: DesignToken<ColorValue>;
    _active: ButtonStateColorTokens;
    _focus: ButtonStateColorTokens;
    _disabled: ButtonStateColorTokens;
    _hover: ButtonStateColorTokens;
  };
}

export const stepperfield: StepperFieldTokens = {
  borderColor: { value: '{components.fieldcontrol.borderColor}' },
  flexDirection: { value: 'column' },
  input: {
    color: { value: '{components.fieldcontrol.color}' },
    fontSize: { value: '{components.fieldcontrol.fontSize}' },
    textAlign: { value: 'center' },
  },
  button: {
    color: { value: '{components.button.color}' },
    backgroundColor: { value: '{colors.transparent}' },
    _active: {
      color: { value: '{components.button._active.color}' },
      backgroundColor: { value: '{components.button._active.backgroundColor}' },
    },
    _focus: {
      color: { value: '{components.button._focus.color}' },
      backgroundColor: { value: '{components.button._focus.backgroundColor}' },
    },
    _disabled: {
      color: { value: '{components.button._disabled.color}' },
      backgroundColor: {
        value: '{components.button._disabled.backgroundColor}',
      },
    },
    _hover: {
      color: { value: '{components.button._hover.color}' },
      backgroundColor: { value: '{components.button._hover.backgroundColor}' },
    },
  },
};
