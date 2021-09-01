import { authMachine } from '@aws-amplify/ui';
import { useActor, useInterpret } from '@xstate/vue';

export const useAuth = () => {
  const service = useInterpret(authMachine, {
    devTools: process.env.NODE_ENV === 'development',
  });

  return useActor(service);
};
