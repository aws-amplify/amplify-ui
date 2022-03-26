import {
  DesignToken,
  FlexDirectionValue,
  TextAlignValue,
} from '../types/designToken';

interface StepperFieldInputTokens {
  textAlign: DesignToken<TextAlignValue>;
}

export interface StepperFieldTokens {
  flexDirection: DesignToken<FlexDirectionValue>;
  input: StepperFieldInputTokens;
}

export const stepperfield: StepperFieldTokens = {
  flexDirection: { value: 'column' },
  input: {
    textAlign: { value: 'center' },
  },
};
