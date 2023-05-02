import React, { ReactNode, useContext, useEffect, useMemo } from 'react';
import { useInterpret } from '@xstate/react';

import {
  AuthStatus,
  AuthMachineHubHandler,
  createAuthenticatorMachine,
  defaultAuthHubHandler,
  listenToAuthHub,
} from '@aws-amplify/ui';

import { AuthenticatorContext } from './AuthenticatorContext';
import { Auth } from 'aws-amplify';

type Options = Parameters<AuthMachineHubHandler>[2];

const createHubHandler =
  (options: Options): AuthMachineHubHandler =>
  async (data, service) => {
    await defaultAuthHubHandler(data, service, options);
  };

export default function AuthenticatorProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [authStatus, setAuthStatus] = React.useState<AuthStatus>('configuring');

  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user: { username?: string }) => {
        if (user?.username) {
          setAuthStatus('authenticated');
        }
      })
      // prevent `Auth.currentAuthenticatedUser` from logging an error if `user` is `undefined`
      .catch(() => null);
  }, []);

  /**
   * Based on use cases, developer might already have added another Provider
   * outside Authenticator. In that case, we sync the two providers by just
   * passing the parent value.
   *
   * TODO(BREAKING): enforce only one provider in App tree
   */
  const parentProviderVal = useContext(AuthenticatorContext);
  const service = useInterpret(createAuthenticatorMachine);

  const value = useMemo(
    () => (!parentProviderVal ? { authStatus, service } : parentProviderVal),
    [authStatus, parentProviderVal, service]
  );

  const { service: activeService } = value;

  useEffect(() => {
    const onSignIn = () => {
      setAuthStatus('authenticated');
    };
    const onSignOut = () => {
      setAuthStatus('unauthenticated');
    };

    const unsubscribe = listenToAuthHub(
      activeService,
      createHubHandler({ onSignIn, onSignOut })
    );
    return unsubscribe;
  }, [activeService]);

  return (
    <AuthenticatorContext.Provider value={value}>
      {children}
    </AuthenticatorContext.Provider>
  );
}
