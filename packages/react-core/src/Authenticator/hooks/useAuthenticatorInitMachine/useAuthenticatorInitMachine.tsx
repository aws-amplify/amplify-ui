import React from 'react';
import type { AuthenticatorMachineOptions } from '@aws-amplify/ui';

import type { UseAuthenticatorSelector } from '../useAuthenticator';
import { useAuthenticator } from '../useAuthenticator';

// only select `route` from machine context
export const routeSelector: UseAuthenticatorSelector = ({ route }) => [route];

export default function useAuthenticatorInitMachine(
  data: AuthenticatorMachineOptions
): void {
  const { route, initializeMachine } = useAuthenticator(routeSelector);

  const hasInitialized = React.useRef(false);
  React.useEffect(() => {
    // `setup` is the usual route on first render, but signing out before the
    // `Authenticator` is rendered moves the machine past setup on its own. Send
    // `INIT` on any route other than `idle`, which resolves the current user
    // before the machine can accept it.
    if (!hasInitialized.current && route !== 'idle') {
      initializeMachine(data);

      hasInitialized.current = true;
    }
  }, [initializeMachine, route, data]);
}
