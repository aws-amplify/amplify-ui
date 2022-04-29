import * as React from 'react';

import { useAuthenticator } from '../hooks/useAuthenticator';
import { ConfirmSignUp } from '../ConfirmSignUp';
import { ForceNewPassword } from '../ForceNewPassword';
import { SetupTOTP } from '../SetupTOTP';
import { SignInSignUpTabs } from '../shared';
import { ConfirmVerifyUser, VerifyUser } from '../VerifyUser';
import { ConfirmSignIn } from '../ConfirmSignIn/ConfirmSignIn';
import { ConfirmResetPassword, ResetPassword } from '../ResetPassword';
import { isSignInOrSignUpRoute } from '../utils';
import { RouterProps } from './types';

const getRouteComponent = (route: string) => {
  switch (route) {
    case 'authenticated':
    case 'idle':
    case 'setup':
      return () => null;
    case 'confirmSignUp':
      return ConfirmSignUp;
    case 'confirmSignIn':
      return ConfirmSignIn;
    case 'setupTOTP':
      return SetupTOTP;
    case 'signIn':
    case 'signUp':
      return SignInSignUpTabs;
    case 'forceNewPassword':
      return ForceNewPassword;
    case 'resetPassword':
      return ResetPassword;
    case 'confirmResetPassword':
      return ConfirmResetPassword;
    case 'verifyUser':
      return VerifyUser;
    case 'confirmVerifyUser':
      return ConfirmVerifyUser;
    default:
      console.warn(
        `Unhandled Authenticator route - please open an issue: ${route}`
      );
      return () => null;
  }
};

export function Router({ hideSignUp }: RouterProps) {
  const { route } = useAuthenticator(({ route }) => [route]);
  const RouteComponent = React.useMemo(() => getRouteComponent(route), [route]);

  return (
    <RouteComponent
      hideSignUp={isSignInOrSignUpRoute(route) ? hideSignUp : undefined}
    />
  );
}
