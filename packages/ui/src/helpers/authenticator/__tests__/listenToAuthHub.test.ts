import { Hub } from '@aws-amplify/core';

import * as Utils from '../utils';
import { AuthInterpreter } from '../../../types';

const authenticatedStateMachine = {
  getSnapshot: () => ({
    // this is the state.matches function
    matches: (state: string) => state === 'authenticated.idle',
  }),
  send: jest.fn(),
} as unknown as AuthInterpreter;

const hubHandlerSpy = jest
  .spyOn(Utils, 'defaultAuthHubHandler')
  .mockReturnValue(Promise.resolve());

describe('listenToAuthHub', () => {
  it('calls defaultAuthHubHandler on Auth Hub event', () => {
    Utils.listenToAuthHub(authenticatedStateMachine);
    Hub.dispatch('auth', { event: 'signOut' });

    expect(hubHandlerSpy).toHaveBeenCalledWith(
      {
        channel: 'auth',
        patternInfo: [],
        payload: { event: 'signOut' },
        // @todo-migration confirm changing from source '' to undefined is correct
        source: undefined,
      },
      authenticatedStateMachine
    );
  });
});
