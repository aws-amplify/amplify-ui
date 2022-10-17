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

const authSendSpy = jest.spyOn(authenticatedStateMachine, 'send');
const unauthSendSpy = jest.spyOn(unauthenticatedStateMachine, 'send');

describe('listenToAuthHub', () => {
  beforeEach(() => {
    authSendSpy.mockClear();
    unauthSendSpy.mockClear();
  });

  it('responds to token refresh event when state is authenticated', () => {
    const unsubscribe = listenToAuthHub(authenticatedStateMachine as any);

    Hub.dispatch('auth', { event: 'tokenRefresh' });
    expect(authSendSpy).toBeCalledWith('TOKEN_REFRESH');

    unsubscribe();
  });

  it('ignores token refresh event when state is unauthenticated', () => {
    const unsubscribe = listenToAuthHub(unauthenticatedStateMachine as any);

    Hub.dispatch('auth', { event: 'tokenRefresh' });
    expect(authSendSpy).not.toHaveBeenCalled();

    unsubscribe();
  });

  it('responds to signOut event when state is authenticated', () => {
    const unsubscribe = listenToAuthHub(authenticatedStateMachine as any);

    Hub.dispatch('auth', { event: 'signOut' });
    expect(authSendSpy).toBeCalledWith('SIGN_OUT');

    unsubscribe();
  });

  it('ignores token refresh event when state is unauthenticated', () => {
    const unsubscribe = listenToAuthHub(unauthenticatedStateMachine as any);

    Hub.dispatch('auth', { event: 'signOut' });
    expect(authSendSpy).not.toHaveBeenCalled();

    unsubscribe();
  });

  it('signs user out when token refresh failed in authenticated state', () => {
    const unsubscribe = listenToAuthHub(authenticatedStateMachine as any);

    Hub.dispatch('auth', { event: 'tokenRefresh_failure' });
    expect(authSendSpy).toBeCalledWith('SIGN_OUT');

    unsubscribe();
  });

  it('ignores token refresh failure event when state is unauthenticated', () => {
    const unsubscribe = listenToAuthHub(unauthenticatedStateMachine as any);

    Hub.dispatch('auth', { event: 'tokenRefresh_failure' });
    expect(authSendSpy).not.toHaveBeenCalled();

    unsubscribe();
  });

  it('responds to autoSignIn event when state is unauthenticated', () => {
    const unsubscribe = listenToAuthHub(unauthenticatedStateMachine as any);

    Hub.dispatch('auth', { event: 'autoSignIn' });
    expect(unauthSendSpy).toBeCalledWith({ type: 'AUTO_SIGN_IN' });

    unsubscribe();
  });

  it('ignores autoSignIn event when state is authenticated', () => {
    const unsubscribe = listenToAuthHub(authenticatedStateMachine as any);

    Hub.dispatch('auth', { event: 'autoSignIn' });
    expect(unauthSendSpy).not.toBeCalledWith();

    unsubscribe();
  });

  it('responds to autoSignIn_failure event', () => {
    const unsubscribe = listenToAuthHub(unauthenticatedStateMachine as any);

    Hub.dispatch('auth', { event: 'autoSignIn_failure' });
    expect(unauthSendSpy).toBeCalledWith({ type: 'AUTO_SIGN_IN_FAILURE' });

    unsubscribe();
  });
});
