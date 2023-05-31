import React from 'react';
import {
  BaseAlertProps,
  BaseButtonProps,
  PasswordFieldProps,
  PrimitivePropsWithoutRef,
} from '../../primitives/types';

/*
 * These are primitive prop types that account settings component use.
 *
 * Note that `PrimitiveProps` is used to get native html types, like `onSubmit`.
 */
type PasswordFieldPrimitiveProps = PrimitivePropsWithoutRef<
  PasswordFieldProps,
  'input'
>;
type ButtonPrimitiveProps = PrimitivePropsWithoutRef<BaseButtonProps, 'button'>;
type AlertPrimitiveProps = PrimitivePropsWithoutRef<BaseAlertProps, 'div'>;

/*
 * These are common prop types for component overrides.
 *
 * Any essential props for overriding components are marked as required.
 */
type CommonPasswordFieldProps = Partial<PasswordFieldPrimitiveProps> &
  Required<
    Pick<PasswordFieldPrimitiveProps, 'onBlur' | 'onChange' | 'name'>
  > & { fieldValidationErrors?: string[] };

type CommonAlertProps = Partial<
  PrimitivePropsWithoutRef<BaseAlertProps, 'div'>
> &
  Required<Pick<AlertPrimitiveProps, 'children'>>;

type CommonButtonProps<T extends 'submit' | 'default' = 'default'> =
  Partial<ButtonPrimitiveProps> &
    Required<
      Pick<ButtonPrimitiveProps, T extends 'submit' ? never : 'onClick'>
    >;

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
