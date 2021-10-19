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

  const {
    route,
    signIn,
    signOut,
    signUp,
    submitForm,
    user,
    updateForm,
  } = getServiceFacade({
    send,
    state,
  });
  const isPending = false; // TODO Check if .matches endsWith('pending')
  console.log({ isPending, state });

  const actorContext: ActorContextWithForms = getActorContext(state);
  const error = actorContext?.remoteError;

  return {
    components,
    error,
    isPending,
    route,
    signIn,
    signOut,
    signUp,
    submitForm,
    updateForm,
    user,
  };
};

const [Provider, useAuthenticator] = generateContext(useAuthenticatorValue, {
  missingProviderMessage:
    'useAuthenticator is being used outside of an <Provider>',
  requireProvider: true,
});

export { Provider, useAuthenticator };
