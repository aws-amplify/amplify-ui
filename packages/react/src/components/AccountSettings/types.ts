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
 * Note that `PrimitiveProps` is used to get native html types, like `onSubmit`.
 */
type CommonPasswordFieldProps = PrimitiveProps<PasswordFieldProps, 'input'>;
type CommonButtonProps = PrimitiveProps<ButtonProps, 'button'>;
type CommonAlertProps = PrimitiveProps<AlertProps, 'div'>;

/**
 * These are overridable component types (e.g. submit button).
 */
export type AccountSettingsPasswordField<Props = {}> = React.ComponentType<
  // `Props` generic allows additional props passed on override components
  Props & CommonPasswordFieldProps
>;

export type AccountSettingsSubmitButton<Props = {}> = React.ComponentType<
  Props & CommonButtonProps
>;

export type AccountSettingsError<Props = {}> = React.ComponentType<
  Props & CommonAlertProps
>;

/** Form specific types */
export type FormValues = Record<string, string>;

export type BlurredFields = Record<string, boolean>;

export type ValidationError = Record<string, string[]>;
