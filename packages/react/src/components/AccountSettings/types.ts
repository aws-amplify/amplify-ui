import React from 'react';
import {
  AlertProps,
  ButtonProps,
  PasswordFieldProps,
} from '../../primitives/types';

/*
 * These are common prop types for component overrides.
 *
 * Any essential props for overriding components are marked as required.
 */
type CommonPasswordFieldProps = Partial<PasswordFieldProps> &
  Required<Pick<PasswordFieldProps, 'onBlur' | 'onChange' | 'name'>> & {
    fieldValidationErrors?: string[];
  };

type CommonAlertProps = Partial<AlertProps> &
  Required<Pick<AlertProps, 'children'>>;

type CommonButtonProps<T extends 'submit' | 'default' = 'default'> =
  Partial<ButtonProps> &
    Required<Pick<ButtonProps, T extends 'submit' ? never : 'onClick'>>;

/*
 * These are component override types.
 * Usage of `Props` generic allows additional props passed on override components
 */
export type PasswordFieldComponent<Props = {}> = React.ComponentType<
  Props & CommonPasswordFieldProps
>;

export type ButtonComponent<Props = {}> = React.ComponentType<
  Props & CommonButtonProps
>;

export type SubmitButtonComponent<Props = {}> = React.ComponentType<
  Props & CommonButtonProps<'submit'>
>;

export type ErrorMessageComponent<Props = {}> = React.ComponentType<
  Props & CommonAlertProps
>;

/* Form specific types */
export type FormValues = Record<string, string>;

export type BlurredFields = string[];

export type ValidationError = Record<string, string[]>;
