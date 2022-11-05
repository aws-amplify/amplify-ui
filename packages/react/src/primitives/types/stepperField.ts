import { TextFieldProps } from '../types/textField';

export interface StepperFieldProps extends TextFieldProps {
  /**
   * @description
   * <input> elements of type number are used to let the user enter a number. They include built-in validation to reject non-numerical entries.
   */
  type?: 'number';

  /**
   * @description
   * Sets the minimum possible value
   */
  min?: number;

  /**
   * @description
   * Sets the maximum possible value
   */
  max?: number;

  /**
   * @description
   * Controls the interval between selectable values
   */
  step?: number;

  /**
   * @description
   * Controls the current value when using the StepperField as a controlled component
   */
  value?: number;

  /**
   * @description
   * Sets the StepperField’s initial value on render
   */
  defaultValue?: number;

  /**
   * @description
   * Set the label text for increase button.
   * This will be used to construct its the `aria-label`. e.g., "Increase to 2" if the current step is 1.
   * @default
   * "Increase to"
   */
  increaseButtonLabel?: string;

  /**
   * @description
   * Set the label text for decrease button.
   * This will be used to construct its the `aria-label`. e.g., "Decrease to 0" if the current step is 1.
   * @default
   * "Decrease to"
   */
  decreaseButtonLabel?: string;

  /**
   * @description
   * TODO:
   * Extends StepperField props from Omit<TextFieldProps, 'onChange'>, after removing [key: string]: any from the base type
   * and rename onStepChange to onChange
   */
  onStepChange?: (value: number) => void;

  /**
   * @description
   * Handles the event when a user clicks on the increment button
   */
  onIncrease?: () => void;

  /**
   * @description
   * Handles the event when a user clicks on the decrement button
   */
  onDecrease?: () => void;
}
