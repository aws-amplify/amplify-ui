import {
  AuthenticatorMachineOptions,
  createAuthenticatorMachine,
  getServiceFacade,
} from '@aws-amplify/ui';
import { useMachine } from '@xstate/react';
import * as React from 'react';
import generateContext from 'react-generate-context';

import { defaultComponents } from './defaultComponents';

export type ProviderProps = AuthenticatorMachineOptions & {
  components?: typeof defaultComponents;
  services?: AuthenticatorMachineOptions['services'];
};

const useAuthenticatorValue = ({
  components: customComponents,
  initialState,
  loginMechanisms,
  services,
}: ProviderProps) => {
  const [state, send] = useMachine(
    () =>
      createAuthenticatorMachine({ initialState, loginMechanisms, services }),
    {
      devTools: process.env.NODE_ENV === 'development',
    }
  );

  const components = React.useMemo(
    () => ({ ...defaultComponents, ...customComponents }),
    [customComponents]
  );

  const facade = React.useMemo(
    () => getServiceFacade({ send, state }),
    [send, state]
  );

  return {
    /** @deprecated For internal use only */
    _send: send,
    /** @deprecated For internal use only */
    _state: state,
    components,
    ...facade,
  };
};

const [Provider, useAuthenticator] = generateContext(useAuthenticatorValue, {
  missingProviderMessage:
    'useAuthenticator is being used outside of an <Provider>',
  requireProvider: true,
});

export { Provider, useAuthenticator };
