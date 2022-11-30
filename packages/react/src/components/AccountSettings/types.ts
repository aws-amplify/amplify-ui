import React from 'react';
import {
  AlertProps,
  ButtonProps,
  TextFieldProps,
  ImageProps,
  PasswordFieldProps,
  PrimitiveProps,
} from '../../primitives/types';

/**
 * These are primitive prop types that account settings component use.
 *
 * Note that `PrimitiveProps` is used to get native html types, like `onSubmit`.
 */
type CommonPasswordFieldProps = Partial<
  PrimitiveProps<PasswordFieldProps, 'input'>
>;
type CommonTextFieldProps = Partial<PrimitiveProps<TextFieldProps, 'input'>>;
type CommonImageProps = Partial<PrimitiveProps<ImageProps, 'img'>>;
type CommonButtonProps = Partial<PrimitiveProps<ButtonProps, 'button'>>;
type CommonAlertProps = Partial<PrimitiveProps<AlertProps, 'div'>>;

/*
 * These are overridable component types (e.g. submit button).
 */
export type ComponentPasswordField<Props = {}> = React.ComponentType<
  // `Props` generic allows additional props passed on override components
  Props & CommonPasswordFieldProps & { validationErrors?: string[] }
>;

export type AccountSettingsTextField<Props = {}> = React.ComponentType<
  Props & CommonTextFieldProps
>;

export type AccountSettingsImage<Props = {}> = React.ComponentType<
  Props & CommonImageProps
>;

export type ComponentSubmitButton<Props = {}> = React.ComponentType<
  Props & CommonButtonProps
>;

export type ComponentError<Props = {}> = React.ComponentType<
  Props & CommonAlertProps
>;

/* Form specific types */
export type FormValues = Record<string, string>;

export type BlurredFields = string[];

export type ValidationError = Record<string, string[]>;
