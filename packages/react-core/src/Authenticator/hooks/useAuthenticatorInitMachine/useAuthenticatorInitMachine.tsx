import React from 'react';
import { AuthenticatorMachineOptions } from '@aws-amplify/ui';

import {
  useAuthenticator,
  UseAuthenticatorSelector,
} from '../useAuthenticator';

// only select `route` from machine context
export const routeSelector: UseAuthenticatorSelector = ({ route }) => [route];

export default function useAuthenticatorInitMachine(
  data: AuthenticatorMachineOptions
): void {
  const { route, initializeMachine } = useAuthenticator(routeSelector);

  const hasInitialized = React.useRef(false);
  React.useEffect(() => {
    if (!hasInitialized.current && route === 'setup') {
      initializeMachine(data);

      hasInitialized.current = true;
    }
  }, [initializeMachine, route, data]);
}
