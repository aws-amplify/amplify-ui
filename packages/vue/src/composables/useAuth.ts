import { useActor } from '@xstate/vue';
import { authService } from '@aws-amplify/ui';

export const useAuth = () => {
  return useActor(authService);
};
