import React from 'react';

import { UseMachine } from '../Machine';

export type ComponentRoute =
  | 'confirmResetPassword'
  | 'confirmSignIn'
  | 'confirmSignUp'
  | 'confirmVerifyUser'
  | 'forceNewPassword'
  | 'resetPassword'
  | 'setupTOTP'
  | 'signIn'
  | 'signUp'
  | 'verifyUser';

export type InitialRoute = 'signIn' | 'signUp' | 'resetPassword';

export interface ComponentRouteContextType
  extends Pick<UseMachine, 'setRoute'> {
  hideSignUp: boolean;
  route: ComponentRoute | undefined;
}

export interface ComponentRouteProviderProps {
  children?: React.ReactNode;
  hideSignUp?: boolean;
}
