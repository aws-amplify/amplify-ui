import { getServiceFacade } from '@aws-amplify/ui';
import { useActor } from '@xstate/vue';
import { inject } from 'vue';
import { InterpretServiceInjectionKeyTypes } from '../types';

export const useAuth = () => {
  const service = inject(InterpretServiceInjectionKeyTypes);

  const { state, send } = useActor(service);

  return getServiceFacade([state, send]);
};
