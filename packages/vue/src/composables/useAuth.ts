import { useActor } from '@xstate/vue';
import { ref, reactive, Ref } from 'vue';
import { AuthenticatorServiceFacade } from '@aws-amplify/ui';
import { facade } from './useUtils';
import { InterpretService } from '@/components';

const service = ref() as Ref<InterpretService>;

/** @deprecated */
export const useAuth = (serv?: InterpretService) => {
  if (serv) {
    service.value = serv;
  }
  return useActor(service.value);
};

const stateAuth = reactive<AuthenticatorServiceFacade>({
  ...facade,
});

export const useAuthenticator = () => stateAuth;

export function updateAuthValues(facadeValues: AuthenticatorServiceFacade) {
  for (const key of Object.keys(facade)) {
    //@ts-ignore
    stateAuth[key as keyof typeof stateAuth] =
      facadeValues[key as keyof typeof facadeValues];
  }
}
