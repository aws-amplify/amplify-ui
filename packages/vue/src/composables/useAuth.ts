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

  // TODO(BREAKING): remove the cast to any
  const useAuthenticatorValue = reactive({}) as any;

  /*
   * Note that watchEffect runs immediately, so `useAuthenticatorValue` is
   * guaranteed to have facade values by the time `useAuthenticator` returns.
   *
   * https://vuejs.org/api/reactivity-core.html#watcheffect
   */
  watchEffect(() => {
    const facade = getServiceFacade({ send, state: state.value });

    /*
     * TODO(BREAKING): consider using a plain object with `refs` instead of
     * one `reactive` object to prevent iterating manually over its keys.
     */
    for (const key of Object.keys(facade)) {
      //@ts-ignore
      useAuthenticatorValue[key] = facade[key];
    }
    useAuthenticatorValue.authStatus = authStatus.value;
    useAuthenticatorValue.send = send;
    useAuthenticatorValue.state = state;
  });

  return useAuthenticatorValue;
});
