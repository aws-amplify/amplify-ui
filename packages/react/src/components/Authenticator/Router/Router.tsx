import { useMemo } from 'react';

import { ConfirmSignIn } from '../ConfirmSignIn/ConfirmSignIn';
import { ConfirmSignUp } from '../ConfirmSignUp';
import { ConfirmResetPassword, ResetPassword } from '../ResetPassword';
import { ConfirmVerifyUser, VerifyUser } from '../VerifyUser';
import { ForceNewPassword } from '../ForceNewPassword';
import { SetupTOTP } from '../SetupTOTP';
import { SignInSignUpTabs } from '../shared';

import { useAuthenticator } from '../hooks';
import { isSignInOrSignUpRoute } from '../utils';

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

export default function Router({ hideSignUp }: { hideSignUp: boolean }) {
  const { route } = useAuthenticator();
  const RouteComponent = useMemo(() => getRouteComponent(route), [route]);

  return (
    <RouteComponent
      hideSignUp={isSignInOrSignUpRoute(route) ? hideSignUp : undefined}
    />
  );
}
