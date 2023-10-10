import React from 'react';

import { AuthenticatorMachineOptions } from '@aws-amplify/ui';

import { DefaultContainerComponent } from './common';
import { Components } from './Defaults';

type SupportedAuthenticatorMachineOptions = Omit<
  AuthenticatorMachineOptions,
  // `formFields` prop in RWA is to be deprecated
  'formFields'
>;

export interface AuthenticatorProps
  extends SupportedAuthenticatorMachineOptions {
  children?: React.ReactNode;
  Container?: DefaultContainerComponent;
  Footer?: React.ComponentType;
  Header?: React.ComponentType;
  components?: Components;
}

export type WithAuthenticatorOptions = Omit<AuthenticatorProps, 'children'>;
