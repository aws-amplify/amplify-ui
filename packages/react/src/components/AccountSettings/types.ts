import React from 'react';
import {
  AlertProps,
  ButtonProps,
  PasswordFieldProps,
  PrimitiveProps,
} from '../../primitives/types';

/**
 * These are primitive prop types that account settings component use.
 *
 * Note that `PrimitieProps` is used to get native html types, like `onSubmit`.
 */
type CommonPasswordFieldProps = PrimitiveProps<PasswordFieldProps, 'input'>;
type CommonButtonProps = PrimitiveProps<ButtonProps, 'button'>;
type CommonAlertProps = PrimitiveProps<AlertProps, 'div'>;

/**
 * These are overridable component types (e.g. submit button).
 */
export type AccountSettingsPasswordField<Props = {}> = React.ComponentType<
  Props & CommonPasswordFieldProps
>;

export type AccountSettingsSubmitButton<Props = {}> = React.ComponentType<
  Props & CommonButtonProps
>;

/**
 * Error component displays error from Cognito. Gets `errorMessage` as props
 * so that any overrides can parse / modify the error message.
 */
export type AccountSettingsError<Props = {}> = React.ComponentType<
  Props & CommonAlertProps & { errorMessage: string }
>;

/** Form specific types */
export type FormValues = Record<string, string>;
