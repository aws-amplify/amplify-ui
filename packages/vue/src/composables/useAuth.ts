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

const service = ref() as Ref<AuthInterpreter>;

export const useAuth = (): UseAuth => {
  if (!service.value) {
    const machine = createAuthenticatorMachine();
    service.value = interpret(machine).start();
  }
  const authStatus: Ref<AuthStatus> = ref('unauthenticated');

  const onSignIn = () => {
    authStatus.value = 'authenticated';
  };

  const onSignOut = () => {
    authStatus.value = 'unauthenticated';
  };

  const unsubscribeHub = listenToAuthHub(
    service.value,
    async (data, service) => {
      await defaultAuthHubHandler(data, service, { onSignIn, onSignOut });
    }
  );

  Auth.currentAuthenticatedUser()
    .then(() => {
      authStatus.value = 'authenticated';
    })
    .catch(() => {
      authStatus.value = 'unauthenticated';
    });

  const { state, send } = useActor(service.value);

  onScopeDispose(() => {
    unsubscribeHub();
  });

  return { authStatus, service: service.value, send, state };
};

export const useAuthenticator = () => {
  const { authStatus, state, send } = useAuth();

  const useAuthenticatorValue = reactive({
    ...facade,
    send: undefined,
    state: undefined,
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
};
