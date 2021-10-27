import { useActor } from '@xstate/vue';
import { watch, ref, onMounted, reactive, Ref } from 'vue';
import { getServiceFacade } from '@aws-amplify/ui';
import { facade } from './useUtils';
import { InterpretService } from '@/components';

const service = ref() as Ref<InterpretService>;
let useAuthenticatorValue = reactive({ ...facade, send: '', state: '' }) as any;

export const useAuth = (serv?: InterpretService) => {
  if (serv) {
    service.value = serv;
  }
  return useActor(service.value);
};

export const useAuthenticator = () => {
  onMounted(() => {
    const { state, send } = useAuth();

    watch(
      () => state.value.context,
      () => {
        const facadeValues = getServiceFacade({ send, state: state.value });

        for (const key of Object.keys(facade)) {
          //@ts-ignore
          useAuthenticatorValue[key] = facadeValues[key];
        }
        useAuthenticatorValue.send = send;
        useAuthenticatorValue.state = state;
      }
    );
  });

  return useAuthenticatorValue;
};
