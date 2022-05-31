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
    case 'autoSignIn':
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

export function useRouterChildren(
  children: RouterProps['children']
): (props?: Omit<RouterProps, 'children'>) => JSX.Element {
  const { route, signOut, user } = useAuthenticator(
    ({ route, signOut, user }) => [route, signOut, user]
  );

  return React.useMemo(() => {
    const isUnauthenticatedRoute = !(
      route === 'authenticated' || route === 'signOut'
    );

    if (isUnauthenticatedRoute) {
      return getRouteComponent(route);
    }
  }, [route]);
}

export function Router({
  children,
  className,
  hideSignUp,
  variation,
}: RouterProps) {
  const { route, signOut, user } = useAuthenticator(
    ({ route, signOut, user }) => [route, signOut, user]
  );
  const RouterChildren = useRouterChildren(children);

  // `Authenticator` might not have user defined `children` for non SPA use cases.
  if (route === 'authenticated' || route === 'signOut') {
    if (!children) {
      return null;
    }

    return typeof children === 'function'
      ? children({ signOut, user }) // children is a render prop
      : children;
  }

  return (
    <RouterChildren
      className={className}
      hideSignUp={isSignInOrSignUpRoute(route) ? hideSignUp : undefined}
      variation={variation}
    />
  );
}
