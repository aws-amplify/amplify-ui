import { useActor } from '@xstate/vue';
import { ref, reactive, Ref, watchEffect } from 'vue';
import {
  AuthenticatorServiceFacade,
  AuthMachineSend,
  AuthMachineState,
  getServiceFacade,
} from '@aws-amplify/ui';
import { facade } from './useUtils';
import { InterpretService } from '@/components';

const service = ref() as Ref<InterpretService>;

export const useAuth = (serv?: InterpretService) => {
  if (serv) {
    service.value = serv;
  }
  return useActor(service.value);
};
type UseAuthenticatorValue = AuthenticatorServiceFacade & {
  state: AuthMachineState;
  send: AuthMachineSend;
};

const useAuthenticatorValue = reactive<UseAuthenticatorValue>({
  ...facade,
  state: {} as AuthMachineState,
  send: {} as AuthMachineSend,
});

const useInternalAuthenticator = () => {
  createValues();
  watchEffect(() => {
    createValues();
  });
  return useAuthenticatorValue;
};

export const useAuthenticator = useInternalAuthenticator;

function createValues() {
  if (!service.value) return;

  const { state, send } = useAuth();

  const facadeValues = getServiceFacade({
    send,
    state: state.value,
  });

  for (const key of Object.keys(facade)) {
    //@ts-ignore
    useAuthenticatorValue[key as keyof typeof useAuthenticatorValue] =
      facadeValues[key as keyof typeof facadeValues];
  }
  useAuthenticatorValue.send = send;
  useAuthenticatorValue.state = state.value;
}
