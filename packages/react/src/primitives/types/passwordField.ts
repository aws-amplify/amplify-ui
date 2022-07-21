import * as React from 'react';
import { ButtonProps } from './button';
import { TextInputFieldProps } from './textField';

export interface PasswordFieldProps extends TextInputFieldProps {
  /**
   * @description
   * For password fields, will hide the "show password" button
   */
  hideShowPassword?: boolean;

  /**
   * @description
   * Set the `aria-label` for hide password button
   * @default
   * "Hide password"
   */
  hidePasswordButtonLabel?: string;

  /**
   * @description
   * Set the `aria-label` for show password button
   * @default
   * "Show password"
   */
  showPasswordButtonLabel?: string;

  /**
   * @description
   * Password autocomplete type
   * @See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values)
   * @default
   * "current-password"
   */
  autoComplete?: 'new-password' | 'current-password' | string;

  /**
   * @description
   * Forwarded ref for access to show password button DOM element
   */
  showPasswordButtonRef?: React.Ref<HTMLButtonElement>;
}

export type PasswordFieldType = 'password' | 'text';

export interface ShowPasswordButtonProps extends ButtonProps {
  /**
   * @description
   * Determines whether the input is hidden or displayed. Options include 'password' or 'text'
   */
  fieldType: PasswordFieldType;

  /**
   * @description
   * Set the `aria-label` for hide password button
   * @default
   * "Hide password"
   */
  hidePasswordButtonLabel?: string;

  /**
   * @description
   * Set the `aria-label` for show password button
   * @default
   * "Show password"
   */
  showPasswordButtonLabel?: string;
}
