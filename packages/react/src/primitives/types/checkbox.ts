import { InputProps } from './input';

export interface CheckboxProps extends InputProps {
  /**
   * The name of the input field in a checkbox (Useful for form submission).
   */
  name: string;

  /**
   * The value of the checkbox.
   */
  value: string;

  /**
   * Visual prominence will be provided if set to true
   */
  isEmphasized?: boolean;
}
