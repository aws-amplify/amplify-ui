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

const onSignIn = jest.fn();
const onSignOut = jest.fn();

describe('defaultAuthHubHandler', () => {
  beforeEach(() => {
    authSendSpy.mockClear();
    unauthSendSpy.mockClear();
    onSignIn.mockClear();
    onSignOut.mockClear();
  });

  it('responds to token refresh event when state is authenticated', async () => {
    await defaultAuthHubHandler(
      { channel: 'auth', payload: { event: 'tokenRefresh' } },
      authenticatedStateMachine
    );
    expect(authSendSpy).toHaveBeenCalledWith('TOKEN_REFRESH');
  });

  it('ignores token refresh event when state is unauthenticated', async () => {
    await defaultAuthHubHandler(
      { channel: 'auth', payload: { event: 'tokenRefresh' } },
      unauthenticatedStateMachine
    );
    expect(unauthSendSpy).not.toHaveBeenCalled();
  });

  // @todo-migration
  // expect(jest.fn()).toHaveBeenCalledWith(...expected)
  // Expected: "SIGN_OUT"
  // Number of calls: 0
  it.skip('responds to signOut event when state is authenticated', async () => {
    await defaultAuthHubHandler(
      { channel: 'auth', payload: { event: 'signOut' } },
      authenticatedStateMachine
    );
    expect(authSendSpy).toHaveBeenCalledWith('SIGN_OUT');
  });

  it('ignores signOut event when state is unauthenticated', async () => {
    await defaultAuthHubHandler(
      { channel: 'auth', payload: { event: 'signOut' } },
      unauthenticatedStateMachine
    );
    expect(unauthSendSpy).not.toHaveBeenCalled();
  });

  it('signs user out when token refresh failed in authenticated state', async () => {
    await defaultAuthHubHandler(
      { channel: 'auth', payload: { event: 'tokenRefresh_failure' } },
      authenticatedStateMachine
    );
    expect(authSendSpy).toHaveBeenCalledWith('SIGN_OUT');
  });

  it('ignores token refresh failure event when state is unauthenticated', async () => {
    await defaultAuthHubHandler(
      { channel: 'auth', payload: { event: 'tokenRefresh_failure' } },
      unauthenticatedStateMachine
    );
    expect(unauthSendSpy).not.toHaveBeenCalled();
  });

  // @todo-migration
  //  expect(jest.fn()).toHaveBeenCalledWith(...expected)
  //  Expected: {"type": "AUTO_SIGN_IN"}
  //  Number of calls: 0
  it.skip('responds to autoSignIn event when state is unauthenticated', async () => {
    await defaultAuthHubHandler(
      { channel: 'auth', payload: { event: 'autoSignIn' } },
      unauthenticatedStateMachine
    );
    expect(unauthSendSpy).toHaveBeenCalledWith({ type: 'AUTO_SIGN_IN' });
  });

  it('ignores autoSignIn event when state is authenticated', async () => {
    await defaultAuthHubHandler(
      { channel: 'auth', payload: { event: 'autoSignIn' } },
      authenticatedStateMachine
    );
    expect(unauthSendSpy).not.toHaveBeenCalled();
  });

  //  @todo-migration
  //  expect(jest.fn()).toHaveBeenCalledWith(...expected)
  //  Expected: {"type": "AUTO_SIGN_IN_FAILURE"}
  //  Number of calls: 0
  it.skip('responds to autoSignIn_failure event', async () => {
    await defaultAuthHubHandler(
      { channel: 'auth', payload: { event: 'autoSignIn_failure' } },
      unauthenticatedStateMachine
    );
    expect(unauthSendSpy).toHaveBeenCalledWith({
      type: 'AUTO_SIGN_IN_FAILURE',
    });
  });

  //  @todo-migration
  // Expected number of calls: 1
  // Received number of calls: 0
  it.skip.each(['signIn', 'signOut'])(
    'calls the %s event handler as expected',
    async (event) => {
      const handler = event === 'signIn' ? onSignIn : onSignOut;
      const handlerKey = event === 'signIn' ? 'onSignIn' : 'onSignOut';
      await defaultAuthHubHandler(
        { channel: 'auth', payload: { event } },
        authenticatedStateMachine,
        { [handlerKey]: handler }
      );
      expect(handler).toHaveBeenCalledTimes(1);
    }
  );

  it("doesn't break when unsupported event is passed", async () => {
    const spyError = jest.spyOn(console, 'error');
    await defaultAuthHubHandler(
      { channel: 'auth', payload: { event: 'unsupported' } },
      unauthenticatedStateMachine
    );
    expect(spyError).not.toHaveBeenCalled();
  });
});
