import React from 'react';

import { AuthenticatorMachineOptions } from '@aws-amplify/ui';
import { AuthenticatorComponentOverrides } from '@aws-amplify/ui-react-core';

import { ButtonProps, TextFieldProps } from '../primitives';

// TODO: Move to RN usePlatformHandlers
export interface FormHandlers {
  onBlur: TextFieldProps['onBlur'];
  onChangeText: TextFieldProps['onChangeText'];
  onSubmit: ButtonProps['onPress'];
}

/**
 * Custom Authenticator components
 */
export type AuthenticatorComponents<OverrideProps = {}> =
  AuthenticatorComponentOverrides<FormHandlers, OverrideProps>;

export interface AuthenticatorProps extends AuthenticatorMachineOptions {
  children?: React.ReactNode;
  components?: AuthenticatorComponents;
}
