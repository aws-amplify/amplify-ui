import { ref, reactive, Ref, watchEffect, onMounted, onUnmounted } from 'vue';
import { useActor } from '@xstate/vue';
import { interpret } from 'xstate';

import {
  AuthInterpreter,
  createAuthenticatorMachine,
  getServiceFacade,
  listenToAuthHub,
} from '@aws-amplify/ui';

import { facade } from './useUtils';
import { Auth } from 'aws-amplify';

const service = ref() as Ref<AuthInterpreter>;
const useAuthenticatorValue = reactive({
  ...facade,
  send: '' as unknown,
  state: '' as unknown,
}) as any;

export const useAuth = () => {
  onMounted(() => {
    if (!service.value) {
      const machine = createAuthenticatorMachine();
      service.value = interpret(machine);
    }
  });

  const { state, send } = useActor(service.value);

  return { service: service.value, state, send };
};

const useInternalAuthenticator = () => {
  let unsubscribeHub: () => void;

  onMounted(() => {
    createValues();

    unsubscribeHub = listenToAuthHub(service.value);
    Auth.currentAuthenticatedUser()
      .then(() => {
        useAuthenticatorValue.authStatus = 'authenticated';
      })
      .catch(() => {
        useAuthenticatorValue.authStatus = 'unauthenticated';
      });
  });

  onUnmounted(() => {
    unsubscribeHub();
  });

  watchEffect(() => {
    createValues();
  });

  return useAuthenticatorValue;
};

export const useAuthenticator = useInternalAuthenticator;

function createValues() {
  if (!service.value) return;

  const { state, send } = useAuth();

  const facadeValues = getServiceFacade({ send, state: state.value });
  for (const key of Object.keys(facade)) {
    //@ts-ignore
    useAuthenticatorValue[key] = facadeValues[key];
  }
  useAuthenticatorValue.send = send;
  useAuthenticatorValue.state = state;
}
