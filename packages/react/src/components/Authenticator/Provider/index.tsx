import {
  ActorContextWithForms,
  AuthenticatorMachineOptions,
  createAuthenticatorMachine,
  getActorContext,
  getActorState,
  getServiceFacade,
} from '@aws-amplify/ui';
import { useMachine } from '@xstate/react';
import * as React from 'react';
import generateContext from 'react-generate-context';

import { defaultComponents } from './defaultComponents';

export type ProviderProps = AuthenticatorMachineOptions & {
  components?: typeof defaultComponents;
  services?: undefined;
};

const useAuthenticatorValue = ({
  components: customComponents,
  initialState,
  loginMechanisms,
}: ProviderProps) => {
  const [state, send] = useMachine(
    () => createAuthenticatorMachine({ initialState, loginMechanisms }),
    {
      devTools: process.env.NODE_ENV === 'development',
    }
  );

  const components = React.useMemo(
    () => ({ ...defaultComponents, ...customComponents }),
    [customComponents]
  );

  const facade = React.useMemo(() => getServiceFacade({ send, state }), [
    send,
    state,
  ]);

  const isPending =
    state.hasTag('pending') || getActorState(state)?.hasTag('pending');

  const actorContext: ActorContextWithForms = getActorContext(state);
  const error = actorContext?.remoteError;

  return {
    /** @deprecated For internal use only */
    _send: send,
    /** @deprecated For internal use only */
    _state: state,
    components,
    error,
    isPending,
    ...facade,
  };
};

const [Provider, useAuthenticator] = generateContext(useAuthenticatorValue, {
  missingProviderMessage:
    'useAuthenticator is being used outside of an <Provider>',
  requireProvider: true,
});

export { Provider, useAuthenticator };
