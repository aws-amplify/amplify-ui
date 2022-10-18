import React from 'react';
import { AuthenticatorMachineOptions } from '@aws-amplify/ui';

import { useAuthenticator } from '../useAuthenticator';

// Utility hook that sends init event to the parent provider
export default function useAuthenticatorInitMachine(
  data: AuthenticatorMachineOptions
): void {
  const { route, initializeMachine } = useAuthenticator(({ route }) => [route]);

  const hasInitialized = React.useRef(false);
  React.useEffect(() => {
    if (!hasInitialized.current && route === 'setup') {
      initializeMachine(data);

      hasInitialized.current = true;
    }
  }, [initializeMachine, route, data]);
}
