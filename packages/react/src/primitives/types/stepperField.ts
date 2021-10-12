import { TextFieldProps } from '../types/textField';

export interface StepperFieldProps extends TextFieldProps {
  type?: 'number';
  min: number;
  max: number;
  step?: number;
  value?: number;
  defaultValue?: number;

  // TODO: Rename to onChange, once PR merged <- https://github.com/aws-amplify/amplify-ui/pull/434
  onStepChange?: (value: number) => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
}
