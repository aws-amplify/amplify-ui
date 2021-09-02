import { authMachine } from '@aws-amplify/ui';
import { useActor } from '@xstate/vue';
import { interpret } from 'xstate';
import { ref } from 'vue';

const service = ref(
  interpret(authMachine, {
    devTools: process.env.NODE_ENV === 'development',
  }).start()
);

export const useAuth = () => {
  return useActor(service.value);
};
