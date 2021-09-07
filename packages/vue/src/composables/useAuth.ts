import { InterpretServiceInjectionKeyTypes } from '../types';
import { useActor } from '@xstate/vue';
import { inject } from 'vue';

export const useAuth = () => {
  const service = inject(InterpretServiceInjectionKeyTypes);
  return useActor(service);
};
