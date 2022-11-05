import { listenToAuthHub } from '../utils';
import { Hub } from 'aws-amplify';

const authenticatedStateMachine = {
  getSnapshot: () => ({
    // this is the state.matches function
    matches: (state: string) => state === 'authenticated.idle',
  }),
  send: jest.fn(),
};

const unauthenticatedStateMachine = {
  getSnapshot: () => ({
    // this is the state.matches function
    matches: (state: string) => state === 'signIn',
  }),
  send: jest.fn(),
};

const sendSpy = jest.spyOn(authenticatedStateMachine, 'send');

describe('listenToAuthHub', () => {
  beforeEach(() => {
    sendSpy.mockClear();
  });

  it('responds to token refresh event when state is authenticated', () => {
    const unsubscribe = listenToAuthHub(authenticatedStateMachine as any);

    Hub.dispatch('auth', { event: 'tokenRefresh' });
    expect(sendSpy).toBeCalledWith('TOKEN_REFRESH');

    unsubscribe();
  });

  it('ignores token refresh event when state is unauthenticated', () => {
    const unsubscribe = listenToAuthHub(unauthenticatedStateMachine as any);

    Hub.dispatch('auth', { event: 'tokenRefresh' });
    expect(sendSpy).not.toHaveBeenCalled();

    unsubscribe();
  });

  it('responds to signOut event when state is authenticated', () => {
    const unsubscribe = listenToAuthHub(authenticatedStateMachine as any);

    Hub.dispatch('auth', { event: 'signOut' });
    expect(sendSpy).toBeCalledWith('SIGN_OUT');

    unsubscribe();
  });

  it('ignores token refresh event when state is unauthenticated', () => {
    const unsubscribe = listenToAuthHub(unauthenticatedStateMachine as any);

    Hub.dispatch('auth', { event: 'signOut' });
    expect(sendSpy).not.toHaveBeenCalled();

    unsubscribe();
  });

  it('signs user out when token refresh failed in authenticated state', () => {
    const unsubscribe = listenToAuthHub(authenticatedStateMachine as any);

    Hub.dispatch('auth', { event: 'tokenRefresh_failure' });
    expect(sendSpy).toBeCalledWith('SIGN_OUT');

    unsubscribe();
  });

  it('ignores token refresh failure event when state is unauthenticated', () => {
    const unsubscribe = listenToAuthHub(unauthenticatedStateMachine as any);

    Hub.dispatch('auth', { event: 'tokenRefresh_failure' });
    expect(sendSpy).not.toHaveBeenCalled();

    unsubscribe();
  });
});
