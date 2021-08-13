import { createMachine, sendParent } from 'xstate';

import { CognitoUserAmplify, AuthEvent } from '../../../types';
import { Auth } from 'aws-amplify';

interface SignOutContext {
  user?: CognitoUserAmplify;
}

export const signOutActor = createMachine<SignOutContext, AuthEvent>(
  {
    initial: 'pending',
    id: 'signOutActor',
    onDone: { actions: 'reportDone' },
    states: {
      pending: {
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
