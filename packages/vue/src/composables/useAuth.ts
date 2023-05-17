import { ref, reactive, Ref, watchEffect, onUnmounted } from 'vue';
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

const service = ref() as Ref<AuthInterpreter>;

export const useAuth = (): UseAuth => {
  if (!service.value) {
    const machine = createAuthenticatorMachine();
    service.value = interpret(machine);
  }

  const { state, send } = useActor(service.value);
  return { service: service.value, state, send };
};

export const useAuthenticator = () => {
  const { service, state, send } = useAuth();

  let unsubscribeHub: () => void;
  const authStatus = ref<AuthStatus>('configuring');
  const useAuthenticatorValue = reactive({
    ...facade,
    send: undefined,
    state: undefined,
  }) as any;

  const createValues = () => {
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
  };

  createValues();

  const onSignIn = () => {
    authStatus.value = 'authenticated';
  };

  const onSignOut = () => {
    authStatus.value = 'unauthenticated';
  };

  listenToAuthHub(service, async (data, service) => {
    await defaultAuthHubHandler(data, service, { onSignIn, onSignOut });
  });

  Auth.currentAuthenticatedUser()
    .then(() => {
      useAuthenticatorValue.authStatus = 'authenticated';
    })
    .catch(() => {
      useAuthenticatorValue.authStatus = 'unauthenticated';
    });

  watchEffect(() => {
    createValues();
  });

  onUnmounted(() => {
    unsubscribeHub();
  });

  return useAuthenticatorValue;
};
