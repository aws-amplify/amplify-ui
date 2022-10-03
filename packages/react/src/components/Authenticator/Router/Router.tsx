import React, { useMemo } from 'react';

import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { ConfirmSignUp } from '../ConfirmSignUp';
import { ForceNewPassword } from '../ForceNewPassword';
import { SetupTOTP } from '../SetupTOTP';
import { SignInSignUpTabs } from '../shared';
import { ConfirmVerifyUser, VerifyUser } from '../VerifyUser';
import { ConfirmSignIn } from '../ConfirmSignIn/ConfirmSignIn';
import { ConfirmResetPassword, ResetPassword } from '../ResetPassword';
import { isSignInOrSignUpRoute } from '../utils';
import { RouterProps } from './types';

type RouteComponent = (props: Omit<RouterProps, 'children'>) => JSX.Element;

function RenderNothing(): JSX.Element {
  return null;
}

const getRouteComponent = (route: string): RouteComponent => {
  switch (route) {
    case 'authenticated':
    case 'idle':
    case 'setup':
    case 'autoSignIn':
      return RenderNothing;
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
      // eslint-disable-next-line no-console
      console.warn(
        `Unhandled Authenticator route - please open an issue: ${route}`
      );
      return RenderNothing;
  }
};

export function Router({
  className,
  hideSignUp,
  variation,
}: RouterProps): JSX.Element {
  const { route } = useAuthenticator(({ route }) => [route]);
  const RouterChildren = useMemo(() => getRouteComponent(route), [route]);

  return (
    <RouterChildren
      className={className}
      hideSignUp={isSignInOrSignUpRoute(route) ? hideSignUp : undefined}
      variation={variation}
    />
  );
}
