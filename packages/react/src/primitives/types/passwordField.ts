import { ButtonProps } from './button';
import { TextFieldProps } from './textField';

export interface PasswordFieldProps extends Omit<TextFieldProps, 'type'> {
  /**
   * For password fields, will hide the "show password" button
   */
  hideShowPassword?: boolean;
}

export interface ShowPasswordButtonProps extends Pick<ButtonProps, 'onClick'> {}
