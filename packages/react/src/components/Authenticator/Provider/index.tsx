import {
  AuthenticatorMachineOptions,
  ActorContextWithForms,
  createAuthenticatorMachine,
  getActorContext,
  getServiceFacade,
} from '@aws-amplify/ui';
import { useMachine } from '@xstate/react';
import * as React from 'react';
import generateContext from 'react-generate-context';

import { defaultComponents } from './defaultComponents';

type Props = AuthenticatorMachineOptions & {
  components: typeof defaultComponents;
  services: undefined;
};

const useAuthenticatorValue = ({
  components: customComponents,
  initialState,
  loginMechanisms,
  services,
}: Props) => {
  const [state, send, service] = useMachine(
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
