import React from 'react';
import {
  PasswordFieldProps as CommonPasswordFieldProps,
  ButtonProps as CommonButtonProps,
} from '../../primitives/types';

/**
 * These are internal component override types (e.g. custom submit button).
 */
export type PasswordFieldOverride<Props = {}> = React.ComponentType<
  Props & Partial<CommonPasswordFieldProps>
>;

export type SubmitButtonOverride<Props = {}> = React.ComponentType<
  Props & Partial<CommonButtonProps>
> & { type: 'submit'; isDisabled: boolean };
