import { createMachine } from 'xstate';

import type { AuthEvent, SignOutContext } from '../types';
import { signOut } from 'aws-amplify/auth';

export const signOutActor = () => {
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
        signOut: () => signOut(),
      },
    }
  );
};
