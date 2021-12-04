import { useActor } from '@xstate/vue';
import { ref, reactive, Ref, watchEffect } from 'vue';
import { getServiceFacade } from '@aws-amplify/ui';
import { facade } from './useUtils';
import { InterpretService } from '@/components';

const service = ref() as Ref<InterpretService>;
let useAuthenticatorValue = reactive({
  ...facade,
  send: () => '',
  state: {},
}) as any;

export const useAuth = (serv?: InterpretService) => {
  if (serv) {
    service.value = serv;
  }
  return useActor(service.value);
};

export const useAuthenticator = () => {
  createValues();
  watchEffect(() => {
    createValues();
  });
  return useAuthenticatorValue;
};

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
