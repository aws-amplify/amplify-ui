import { createSharedComposable } from '@vueuse/core';
import { reactive, watchEffect, onScopeDispose } from 'vue';
import { useActor } from '@xstate/vue';
import { interpret } from 'xstate';

import {
  AuthInterpreter,
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

  const { state, send } = useActor(service);

  const unsubscribeHub = listenToAuthHub(service, defaultAuthHubHandler);

  onScopeDispose(() => {
    unsubscribeHub();
  });

  return { service, send, state };
});

export const useAuthenticator = createSharedComposable(() => {
  const { state, send } = useAuth();

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
    useAuthenticatorValue.send = send;
    useAuthenticatorValue.state = state;
  });

  return useAuthenticatorValue;
});
