import { TextFieldProps } from '../types/textField';

export interface StepperFieldProps extends TextFieldProps {
  type?: 'number';
  min: number;
  max: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onStepChange?: (value: number) => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
}
