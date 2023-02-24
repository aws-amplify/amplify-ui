import { useActor } from '@xstate/vue';
import { ref, reactive, Ref } from 'vue';
import { AuthenticatorServiceFacade } from '@aws-amplify/ui';
import { facade } from './useUtils';
import { InterpretService } from '@/components';

const service = ref() as Ref<InterpretService>;

/** @deprecated For internal use only */
export const useAuth = (serv?: InterpretService) => {
  if (serv) {
    service.value = serv;
  }
  return useActor(service.value);
};

const useAuthInternal = reactive<AuthenticatorServiceFacade>({
  ...facade,
});

export const useAuthenticator = () => useAuthInternal;

export function updateValues(facadeValues: AuthenticatorServiceFacade) {
  for (const key of Object.keys(facade)) {
    //@ts-ignore
    useAuthInternal[key as keyof typeof useAuthInternal] =
      facadeValues[key as keyof typeof facadeValues];
  }
}
