import { useActor } from '@xstate/vue';
import { authService } from '@aws-amplify/ui-core';

export const useAuth = () => {
  return useActor(authService);
};
