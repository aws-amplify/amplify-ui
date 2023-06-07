import * as React from 'react';
import { BaseButtonProps } from './button';
import { BaseTextFieldProps } from './textField';
import { ElementType, PrimitiveProps } from './view';

export interface BasePasswordFieldProps extends BaseTextFieldProps {
  /**
   * @description
   * For password fields, will hide the "show password" button
   */
  hideShowPassword?: boolean;

  /**
   * @deprecated
   * The hidePasswordButtonLabel prop is no longer in use, since the aria-label is now consistent between state changes.
   * @description
   * Set the `aria-label` for hide password button
   * @default
   * "Hide password"
   */
  hidePasswordButtonLabel?: string;

  /**
   * @description
   * Sets the text read by screen readers when the password is hidden
   * @default
   * "Password is hidden"
   */
  passwordIsHiddenLabel?: string;

  /**
   * @description
   * Sets the text read by screen readers when the password is shown
   * @default
   * "Password is shown"
   */
  passwordIsShownLabel?: string;

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

export type PasswordFieldProps<Element extends ElementType = 'input'> =
  PrimitiveProps<BasePasswordFieldProps, Element>;

export type PasswordFieldType = 'password' | 'text';

export interface BaseShowPasswordButtonProps extends BaseButtonProps {
  /**
   * @description
   * Determines whether the input is hidden or displayed. Options include 'password' or 'text'
   */
  fieldType: PasswordFieldType;

  /**
   * @deprecated
   * The hidePasswordButtonLabel prop is no longer in use, since the aria-label is now consistent between state changes.
   * @description
   * Set the `aria-label` for hide password button
   * @default
   * "Hide password"
   */
  hidePasswordButtonLabel?: string;

  /**
   * @description
   * Sets the text read by screen readers when the password is hidden
   * @default
   * "Password is hidden"
   */
  passwordIsHiddenLabel?: string;

  /**
   * @description
   * Sets the text read by screen readers when the password is shown
   * @default
   * "Password is shown"
   */
  passwordIsShownLabel?: string;

  /**
   * @description
   * Set the `aria-label` for show password button
   * @default
   * "Show password"
   */
  showPasswordButtonLabel?: string;
}

export type ShowPasswordButtonProps<Element extends ElementType = 'button'> =
  PrimitiveProps<BaseShowPasswordButtonProps, Element>;
