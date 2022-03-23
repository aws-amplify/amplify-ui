import { DesignToken, FlexDirectionValue } from '../types/designToken';

export interface StepperFieldTokens {
  flexDirection: DesignToken<FlexDirectionValue>;
  input: never;
}

export const stepperfield: StepperFieldTokens = {
  flexDirection: { value: 'column' },
  input: {
    textAlign: { value: 'center' },
  },
};
