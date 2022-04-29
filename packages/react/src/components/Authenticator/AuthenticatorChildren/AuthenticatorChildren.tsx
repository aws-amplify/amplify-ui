import * as React from 'react';
import { CognitoUserAmplify } from '@aws-amplify/ui';

import { useAuthenticator, UseAuthenticator } from '../hooks/useAuthenticator';

export type AuthenticatorChildrenProps = {
  authenticatedChildren:
    | React.ReactNode
    | ((props: {
        signOut?: UseAuthenticator['signOut'];
        user?: CognitoUserAmplify;
      }) => React.ReactNode);
  children: React.ReactNode;
};

export function AuthenticatorChildren({
  authenticatedChildren,
  children: router,
}: AuthenticatorChildrenProps) {
  const { route, signOut, user } = useAuthenticator(
    ({ route, signOut, user }) => [route, signOut, user]
  );

  const isUnauthenticatedRoute = !(
    route === 'authenticated' || route === 'signOut'
  );

  const children = React.useMemo(() => {
    if (isUnauthenticatedRoute) {
      return router;
    }

    // `Authenticator` might not have user defined `authenticatedChildren` for non SPA use cases.
    if (!authenticatedChildren) {
      return null;
    }

    return typeof authenticatedChildren === 'function'
      ? authenticatedChildren({ signOut, user }) // authenticatedChildren is a render prop
      : authenticatedChildren;
  }, [authenticatedChildren, isUnauthenticatedRoute, router, signOut, user]);

  return <>{children}</>;
}
