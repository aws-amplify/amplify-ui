import { useActor } from '@xstate/vue';
import { ref, reactive, Ref, watchEffect } from 'vue';
import { getServiceFacade } from '@aws-amplify/ui';
import { facade } from './useUtils';
import { InterpretService } from '@/components';
import { createSharedComposable } from '@vueuse/core';

const service = ref() as Ref<InterpretService>;
let useAuthenticatorValue = reactive({ ...facade, send: '', state: '' }) as any;

export const useAuth = (serv?: InterpretService) => {
  if (serv) {
    service.value = serv;
  }
  return useActor(service.value);
};

const useInternalAuthenticator = () => {
  createValues();
  watchEffect(() => {
    createValues();
  });
  return useAuthenticatorValue;
};

export const useAuthenticator = createSharedComposable(
  useInternalAuthenticator
);

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
