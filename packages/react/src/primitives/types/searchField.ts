import { FieldGroupIconButtonProps } from './fieldGroupIcon';
import { TextFieldProps } from './textField';

export interface SearchFieldProps extends TextFieldProps {
  /**
   * Handle submission of search field input
   */
  onSubmit?: React.ChangeEventHandler<HTMLInputElement>;
}

export interface SearchFieldButtonProps
  extends Partial<FieldGroupIconButtonProps> {}
