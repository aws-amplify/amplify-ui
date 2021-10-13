import { TextFieldProps } from '../types/textField';

export interface StepperFieldProps extends TextFieldProps {
  type?: 'number';
  min: number;
  max: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  /**
   * TODO:
   * Extends StepperField props from Omit<TextFieldProps, 'onChange'>, after removing [key: string]: any from the base type
   * and rename onStepChange to onChange
   */
  onStepChange?: (value: number) => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
}
