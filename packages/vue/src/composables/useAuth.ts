import { InterpretServiceInjectionKeyTypes } from '../types';
import { useActor } from '@xstate/vue';
import { inject } from 'vue';

export const useAuth = () => {
  const service = inject(InterpretServiceInjectionKeyTypes);
  //@ts-ignore
  return useActor(service);
};
