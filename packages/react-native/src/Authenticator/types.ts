import React from 'react';

import { AuthenticatorMachineOptions } from '@aws-amplify/ui';

import { Components } from './Defaults';

type SupportedAuthenticatorMachineOptions = Omit<
  AuthenticatorMachineOptions,
  // `socialProviders` not supported as a prop,
  // feature is not enabled in React Native `Authenticator`
  | 'socialProviders'
  // `formFields` prop in RWA is to be deprecated
  | 'formFields'
>;

export interface AuthenticatorProps
  extends SupportedAuthenticatorMachineOptions {
  children?: React.ReactNode;
  components?: Components;
}

export type WithAuthenticatorOptions = Omit<AuthenticatorProps, 'children'>;
