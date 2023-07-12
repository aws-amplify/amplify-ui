import { BaseTextFieldProps } from '../types/textField';
import { ElementType, PrimitiveProps } from './view';

export interface BaseStepperFieldProps extends BaseTextFieldProps {
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
   * Event handler called with the current step value when it is updated
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

export type StepperFieldProps<Element extends ElementType = 'input'> =
  PrimitiveProps<BaseStepperFieldProps, Element>;
