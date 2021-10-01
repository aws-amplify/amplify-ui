import { FlexProps } from './flex';
import { InputProps } from './input';
import { FieldProps } from './field';

export interface CheckboxProps extends FlexProps, InputProps {
  /**
   * The label text
   */
  children: FieldProps['label'];
  /**
   * The name of the input field in a checkbox (Useful for form submission).
   */
  name: string;

  /**
   * The submitted value when checked
   * Shows on form submission as key pair `name:value`
   */
  value: string;
}
