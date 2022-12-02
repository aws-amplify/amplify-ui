import React from 'react';
import {
  AlertProps,
  ButtonProps,
  PasswordFieldProps,
  PrimitiveProps,
} from '../../primitives/types';

/*
 * These are primitive prop types that account settings component use.
 *
 * Note that `PrimitiveProps` is used to get native html types, like `onSubmit`.
 */
type PasswordFieldPrimitiveProps = PrimitiveProps<PasswordFieldProps, 'input'>;
type ButtonPrimtiveProps = PrimitiveProps<ButtonProps, 'button'>;

/*
 * These are common prop types for component overrides.
 *
 * Any essential props for overriding components are marked as required.
 */
type CommonPasswordFieldProps = Partial<PasswordFieldPrimitiveProps> &
  Required<Pick<PasswordFieldPrimitiveProps, 'onBlur' | 'onChange'>>;
type CommonButtonProps = Partial<ButtonPrimtiveProps> &
  Required<Pick<ButtonPrimtiveProps, 'onClick'>>;
type CommonSubmitButtonProps = Partial<PrimitiveProps<ButtonProps, 'button'>>;
type CommonAlertProps = Partial<PrimitiveProps<AlertProps, 'div'>>;

/*
 * These are component override types.
 */
export type PasswordFieldComponent<Props = {}> = React.ComponentType<
  // `Props` generic allows additional props passed on override components
  Props & CommonPasswordFieldProps & { validationErrors?: string[] }
>;

export type ButtonComponent<Props = {}> = React.ComponentType<
  Props & CommonButtonProps
>;

export type SubmitButtonComponent<Props = {}> = React.ComponentType<
  Props & CommonSubmitButtonProps
>;

export type ErrorComponent<Props = {}> = React.ComponentType<
  Props & CommonAlertProps
>;

/* Form specific types */
export type FormValues = Record<string, string>;

export type BlurredFields = string[];

export type ValidationError = Record<string, string[]>;
