import { useActor } from '@xstate/vue';
import { inject } from 'vue';

export const useAuth = () => {
  const service = inject('service');
  return useActor(service);
};
