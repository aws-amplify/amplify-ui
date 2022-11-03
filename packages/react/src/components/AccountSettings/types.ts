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
 * These are component override types (e.g. submit button).
 */
export type PasswordFieldOverride<Props = {}> = React.ComponentType<
  Props & Partial<CommonPasswordFieldProps>
>;

export type SubmitButtonOverride<Props = {}> = React.ComponentType<
  Props & Partial<CommonButtonProps>
>;

export type ErrorOverride<Props = {}> = React.ComponentType<
  Props & Partial<CommonAlertProps> & { errorMessage: string }
>;

/** Form specific types */
export type FormValues = Record<string, string>;
