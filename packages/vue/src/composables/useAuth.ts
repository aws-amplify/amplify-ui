import { useActor } from '@xstate/vue';
import { inject } from 'vue';

export const useAuth = () => {
  //@ts-ignore
  const service = inject('service');
  //@ts-ignore
  return useActor(service);
};
