import { TextInputFieldProps } from '../types/textField';

export interface StepperFieldProps extends TextInputFieldProps {
  type?: 'number';
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  /**
   * @description
   * Set the label text for increase button.
   * This will be used to construct its the `aria-label`. e.g., "Increase to 2" if the current step is 1.
   */
  increaseButtonLabel?: string;
  /**
   * @description
   * Set the label text for decrease button.
   * This will be used to construct its the `aria-label`. e.g., "Decrease to 0" if the current step is 1.
   */
  decreaseButtonLabel?: string;
  /**
   * @description
   * TODO:
   * Extends StepperField props from Omit<TextFieldProps, 'onChange'>, after removing [key: string]: any from the base type
   * and rename onStepChange to onChange
   */
  onStepChange?: (value: number) => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
}
