import React, { useMemo } from 'react';

import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { ConfirmSignUp } from '../ConfirmSignUp';
import { ForceNewPassword } from '../ForceNewPassword';
import { SetupTotp } from '../SetupTotp';
import { SignInSignUpTabs } from '../shared';
import { ConfirmVerifyUser, VerifyUser } from '../VerifyUser';
import { ConfirmSignIn } from '../ConfirmSignIn/ConfirmSignIn';
import { ConfirmResetPassword, ForgotPassword } from '../ForgotPassword';
import { isSignInOrSignUpRoute } from '../utils';
import type { RouterProps } from './types';
import { SelectMfaType } from '../SelectMfaType';
import { SetupEmail } from '../SetupEmail';

type RouteComponent = (
  props: Omit<RouterProps, 'children'>
) => React.JSX.Element;

function RenderNothing(): React.JSX.Element {
  // @ts-ignore
  return null;
}

const getRouteComponent = (route: string): RouteComponent => {
  switch (route) {
    case 'authenticated':
    case 'idle':
    case 'setup':
    case 'transition':
      return RenderNothing;
    case 'confirmSignUp':
      return ConfirmSignUp;
    case 'confirmSignIn':
      return ConfirmSignIn;
    case 'selectMfaType':
      return SelectMfaType;
    case 'setupEmail':
      return SetupEmail;
    case 'setupTotp':
      return SetupTotp;
    case 'signIn':
    case 'signUp':
      return SignInSignUpTabs;
    case 'forceNewPassword':
      return ForceNewPassword;
    case 'forgotPassword':
      return ForgotPassword;
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
}: RouterProps): React.JSX.Element {
  const { route } = useAuthenticator(({ route }) => [route]);
  const RouterChildren = useMemo(() => getRouteComponent(route), [route]);

  return (
    <RouterChildren
      className={className}
      // @ts-ignore
      hideSignUp={isSignInOrSignUpRoute(route) ? hideSignUp : undefined}
      variation={variation}
    />
  );
}
