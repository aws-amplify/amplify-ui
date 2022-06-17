import { TextInputFieldProps } from '../types/textField';

export interface StepperFieldProps extends TextInputFieldProps {
  /**
   * <input> elements of type number are used to let the user enter a number. They include built-in validation to reject non-numerical entries.
   */
  type?: 'number';

  /**
   * Sets the minimum possible value
   */
  min?: number;

  /**
   * Sets the maximum possible value
   */
  max?: number;

  /**
   * Controls the interval between selectable values
   */
  step?: number;

  /**
   * Controls the current value when using the StepperField as a controlled component
   */
  value?: number;

  /**
   * Sets the StepperField’s initial value on render
   */
  defaultValue?: number;

  /**
   * Set the label text for increase button.
   * This will be used to construct its the `aria-label`. e.g., "Increase to 2" if the current step is 1.
   * @default "Increase to"
   */
  increaseButtonLabel?: string;

  /**
   * Set the label text for decrease button.
   * This will be used to construct its the `aria-label`. e.g., "Decrease to 0" if the current step is 1.
   * @default "Decrease to"
   */
  decreaseButtonLabel?: string;

  /**
   * TODO:
   * Extends StepperField props from Omit<TextFieldProps, 'onChange'>, after removing [key: string]: any from the base type
   * and rename onStepChange to onChange
   */
  onStepChange?: (value: number) => void;

  /**
   * Handles the event when a user clicks on the increment button
   */
  onIncrease?: () => void;

  /**
   * Handles the event when a user clicks on the decrement button
   */
  onDecrease?: () => void;
}
