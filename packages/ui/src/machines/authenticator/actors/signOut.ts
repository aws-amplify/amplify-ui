import { createMachine } from 'xstate';

import { AuthEvent, SignOutContext } from '../../../types';
import { Auth } from 'aws-amplify';

export const signOutActor = createMachine<SignOutContext, AuthEvent>(
  {
    id: 'signOutActor',
    initial: 'pending',
    predictableActionArguments: true,
    states: {
      pending: {
        tags: ['pending'],
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
      signOut: () => Auth.signOut(/* global? */),
    },
  }
);
