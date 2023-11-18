import { createMachine } from 'xstate';

import { DefaultServices } from '../defaultServices';
import { AuthEvent, SignOutContext } from '../types';

export const signOutActor = ({ services }: { services: DefaultServices }) => {
  return createMachine<SignOutContext, AuthEvent>(
    {
      initial: 'pending',
      id: 'signOutActor',
      predictableActionArguments: true,
      states: {
        pending: {
          tags: 'pending',
          invoke: {
            src: 'signOut',
            onDone: 'resolved',
            onError: 'rejected',
          },
        },
        resolved: { type: 'final' },
        rejected: { type: 'final' },
      },
    },
    {
      services: {
        signOut: () => services.signOut(),
      },
    }
  );
};
