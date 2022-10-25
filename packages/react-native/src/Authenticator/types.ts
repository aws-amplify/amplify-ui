import React from 'react';

import { AuthenticatorMachineOptions } from '@aws-amplify/ui';

import { Components } from './Defaults';

export interface AuthenticatorProps extends AuthenticatorMachineOptions {
  children?: React.ReactNode;
  components?: Components;
}
