import { createMachine } from 'xstate';

import { AuthEvent, SignOutContext } from '../../../types';
import * as Auth from '@aws-amplify/auth';
import { groupLog } from '../../../utils';

export const signOutActor = () => {
  groupLog('+++signOutActor (machine)');
  return createMachine<SignOutContext, AuthEvent>(
    {
      initial: 'pending',
      id: 'signOutActor',
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
};
