import { createSharedComposable } from '@vueuse/core';
import { ref, reactive, Ref, watchEffect, onScopeDispose } from 'vue';
import { useActor } from '@xstate/vue';
import { interpret } from 'xstate';

import { Auth } from 'aws-amplify';
import {
  AuthInterpreter,
  AuthStatus,
  createAuthenticatorMachine,
  defaultAuthHubHandler,
  getServiceFacade,
  listenToAuthHub,
} from '@aws-amplify/ui';

import { UseAuth } from '../types';
import { facade } from './useUtils';

export const useAuth = createSharedComposable((): UseAuth => {
  const machine = createAuthenticatorMachine();
  const service: AuthInterpreter = interpret(machine).start();
  const authStatus: Ref<AuthStatus> = ref('configuring');

  const { state, send } = useActor(service);

  const onSignIn = () => {
    authStatus.value = 'authenticated';
  };

  const onSignOut = () => {
    authStatus.value = 'unauthenticated';
  };

  const unsubscribeHub = listenToAuthHub(service, async (data, service) => {
    await defaultAuthHubHandler(data, service, { onSignIn, onSignOut });
  });

  Auth.currentAuthenticatedUser()
    .then(() => {
      authStatus.value = 'authenticated';
    })
    .catch(() => {
      authStatus.value = 'unauthenticated';
    });

  onScopeDispose(() => {
    unsubscribeHub();
  });

  return { authStatus, service, send, state };
});

export const useAuthenticator = createSharedComposable(() => {
  const { authStatus, state, send } = useAuth();

  const useAuthenticatorValue = reactive({
    ...facade,
    send,
    state,
  }) as any;

  watchEffect(() => {
    const facadeValues = getServiceFacade({
      send,
      state: state.value,
    });
    for (const key of Object.keys(facade)) {
      //@ts-ignore
      useAuthenticatorValue[key] = facadeValues[key];
    }
    useAuthenticatorValue.authStatus = authStatus.value;
    useAuthenticatorValue.send = send;
    useAuthenticatorValue.state = state;
  });

  return useAuthenticatorValue;
});
