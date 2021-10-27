import { useActor } from '@xstate/vue';
import {
  watch,
  ref,
  onMounted,
  reactive,
  Ref,
  computed,
  ComputedRef,
} from 'vue';
import { getActorContext, getServiceFacade } from '@aws-amplify/ui';
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
    const actorContext = computed(() =>
      getActorContext(state.value)
    ) as ComputedRef<any>;

    watch(
      () => [state.value.context, actorContext],
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
