import { createSharedComposable } from '@vueuse/core';
import { ref, reactive, Ref, watchEffect, onScopeDispose } from 'vue';
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
  const service: Ref<AuthInterpreter | undefined> = ref(undefined);
  const unsubscribeHub: Ref<(() => void) | undefined> = ref();

  if (!service.value) {
    const machine = createAuthenticatorMachine();
    service.value = interpret(machine).start();
  }

  const { state, send } = useActor(service.value);

  if (!unsubscribeHub.value) {
    unsubscribeHub.value = listenToAuthHub(
      service.value,
      defaultAuthHubHandler
    );
  }
  onScopeDispose(() => {
    unsubscribeHub.value?.();
  });

  return { service: service.value, send, state };
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
