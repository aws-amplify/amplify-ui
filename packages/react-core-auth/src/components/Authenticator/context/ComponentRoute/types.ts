import type React from 'react';

import type { UseMachine } from '../Machine';

export type ComponentRoute =
  | 'confirmResetPassword'
  | 'confirmSignIn'
  | 'confirmSignUp'
  | 'confirmVerifyUser'
  | 'forceNewPassword'
  | 'forgotPassword'
  | 'setupTotp'
  | 'signIn'
  | 'signUp'
  | 'verifyUser';

export type InitialRoute = 'signIn' | 'signUp' | 'forgotPassword';

export interface ComponentRouteContextType
  extends Pick<UseMachine, 'setRoute'> {
  hideSignUp: boolean;
  route: ComponentRoute | undefined;
}

export interface ComponentRouteProviderProps {
  children?: React.ReactNode;
  hideSignUp?: boolean;
}
