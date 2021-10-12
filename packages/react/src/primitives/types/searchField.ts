import { FieldGroupIconButtonProps } from './fieldGroupIcon';
import { TextFieldProps } from './textField';

export interface SearchFieldProps extends TextFieldProps {
  /**
   * Handle submission of search field input
   */
  onSubmit?: (value: string) => void;

  /**
   * Visually hide label
   * @default true
   */
  labelHidden?: boolean;
}

export interface SearchFieldButtonProps
  extends Partial<FieldGroupIconButtonProps> {}
