import { FieldGroupIconButtonProps } from './fieldGroupIcon';
import { TextInputFieldProps } from './textField';

export interface SearchFieldProps extends TextInputFieldProps {
  /**
   * Handle submission of search field input
   */
  onSubmit?: (value: string) => void;

  /**
   * Triggered when search field is cleared
   */
  onClear?: () => void;

  /**
   * Visually hide label
   * @default true
   */
  labelHidden?: boolean;
}

export interface SearchFieldButtonProps
  extends Partial<FieldGroupIconButtonProps> {}
