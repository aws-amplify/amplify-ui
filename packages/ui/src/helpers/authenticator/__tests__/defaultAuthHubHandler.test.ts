import { HubCapsule } from '@aws-amplify/core';
import { defaultAuthHubHandler } from '../utils';
import { AuthInterpreter } from '../../../types';

jest.mock('xstate/lib/waitFor', () => ({
  waitFor: jest.fn(),
}));

jest.mock('../actor', () => ({
  getActorState: () => ({ matches: () => true }),
}));

const authenticatedStateMachine = {
  getSnapshot: () => ({
    // this is the state.matches function
    matches: (state: string) => state === 'authenticated.idle',
  }),
  send: jest.fn(),
} as unknown as AuthInterpreter;

const unauthenticatedStateMachine = {
  getSnapshot: () => ({
    // this is the state.matches function
    matches: (state: string) => state === 'signIn',
  }),
  send: jest.fn(),
} as unknown as AuthInterpreter;

const authSendSpy = jest.spyOn(authenticatedStateMachine, 'send');
const unauthSendSpy = jest.spyOn(unauthenticatedStateMachine, 'send');

describe('defaultAuthHubHandler', () => {
  beforeEach(() => {
    authSendSpy.mockClear();
    unauthSendSpy.mockClear();
  });

  it('responds to token refresh event when state is authenticated', async () => {
    await defaultAuthHubHandler(
      { payload: { event: 'tokenRefresh' } } as unknown as HubCapsule,
      authenticatedStateMachine
    );
    expect(authSendSpy).toBeCalledWith('TOKEN_REFRESH');
  });

  it('ignores token refresh event when state is unauthenticated', async () => {
    await defaultAuthHubHandler(
      { payload: { event: 'tokenRefresh' } } as unknown as HubCapsule,
      unauthenticatedStateMachine
    );
    expect(unauthSendSpy).not.toHaveBeenCalled();
  });

  it('responds to signOut event when state is authenticated', async () => {
    await defaultAuthHubHandler(
      { payload: { event: 'signOut' } } as unknown as HubCapsule,
      authenticatedStateMachine
    );
    expect(authSendSpy).toBeCalledWith('SIGN_OUT');
  });

  it('ignores signOut event when state is unauthenticated', async () => {
    await defaultAuthHubHandler(
      { payload: { event: 'signOut' } } as unknown as HubCapsule,
      unauthenticatedStateMachine
    );
    expect(unauthSendSpy).not.toHaveBeenCalled();
  });

  it('signs user out when token refresh failed in authenticated state', async () => {
    await defaultAuthHubHandler(
      { payload: { event: 'tokenRefresh_failure' } } as unknown as HubCapsule,
      authenticatedStateMachine
    );
    expect(authSendSpy).toBeCalledWith('SIGN_OUT');
  });

  it('ignores token refresh failure event when state is unauthenticated', async () => {
    await defaultAuthHubHandler(
      { payload: { event: 'tokenRefresh_failure' } } as unknown as HubCapsule,
      unauthenticatedStateMachine
    );
    expect(unauthSendSpy).not.toHaveBeenCalled();
  });

  it('responds to autoSignIn event when state is unauthenticated', async () => {
    await defaultAuthHubHandler(
      { payload: { event: 'autoSignIn' } } as unknown as HubCapsule,
      unauthenticatedStateMachine
    );
    expect(unauthSendSpy).toHaveBeenCalledWith({ type: 'AUTO_SIGN_IN' });
  });

  it('ignores autoSignIn event when state is authenticated', async () => {
    await defaultAuthHubHandler(
      { payload: { event: 'autoSignIn' } } as unknown as HubCapsule,
      authenticatedStateMachine
    );
    expect(unauthSendSpy).not.toHaveBeenCalled();
  });

  it('responds to autoSignIn_failure event', async () => {
    await defaultAuthHubHandler(
      { payload: { event: 'autoSignIn_failure' } } as unknown as HubCapsule,
      unauthenticatedStateMachine
    );
    expect(unauthSendSpy).toHaveBeenCalledWith({
      type: 'AUTO_SIGN_IN_FAILURE',
    });
  });
});
