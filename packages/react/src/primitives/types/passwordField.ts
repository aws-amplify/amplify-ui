import { ButtonProps } from './button';
import { TextInputFieldProps } from './textField';

export interface PasswordFieldProps extends TextInputFieldProps {
  /**
   * For password fields, will hide the "show password" button
   */
  hideShowPassword?: boolean;

  /**
   * Password autocomplete type
   * See: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values
   * @default "current-password"
   */
  autoComplete?: 'new-password' | 'current-password' | string;
}

export type PasswordFieldType = 'password' | 'text';

export interface ShowPasswordButtonProps
  extends Pick<ButtonProps, 'onClick' | 'size'> {
  fieldType: PasswordFieldType;
}
