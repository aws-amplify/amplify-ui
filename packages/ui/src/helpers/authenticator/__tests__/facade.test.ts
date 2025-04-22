import { Sender } from 'xstate';

import {
  AuthEvent,
  AuthMachineState,
} from '../../../machines/authenticator/types';

import {
  getSendEventAliases,
  getServiceContextFacade,
  getServiceFacade,
  getNextServiceFacade,
} from '../facade';

jest.mock('../actor', () => {
  const originalModule = jest.requireActual('../actor');
  return {
    ...originalModule,
    getActorState: (machineState: AuthMachineState) => ({
      matches: (state: string) => {
        return state === machineState.value;
      },
      hasTag: () => false,
    }),
  };
});

describe('getSendEventAliases', () => {
  it('should return an object with methods that send events when called', () => {
    const mockSend: Sender<AuthEvent> = jest.fn();

    const {
      initializeMachine,
      resendCode,
      signOut,
      submitForm,
      updateForm,
      updateBlur,
      toFederatedSignIn,
      toForgotPassword,
      toSignIn,
      toSignUp,
      skipVerification,
    } = getSendEventAliases(mockSend);

    initializeMachine();
    resendCode();
    signOut();
    submitForm();
    updateForm();
    updateBlur();
    toFederatedSignIn();
    toForgotPassword();
    toSignIn();
    toSignUp();
    skipVerification();

    expect(mockSend).toHaveBeenCalledTimes(11);
    expect(mockSend).toHaveBeenCalledWith({ type: 'INIT' });
    expect(mockSend).toHaveBeenCalledWith({ type: 'RESEND' });
    expect(mockSend).toHaveBeenCalledWith({ type: 'SIGN_OUT' });
    expect(mockSend).toHaveBeenCalledWith({ type: 'SUBMIT' });
    expect(mockSend).toHaveBeenCalledWith({ type: 'CHANGE' });
    expect(mockSend).toHaveBeenCalledWith({ type: 'BLUR' });
    expect(mockSend).toHaveBeenCalledWith({ type: 'FEDERATED_SIGN_IN' });
    expect(mockSend).toHaveBeenCalledWith({ type: 'FORGOT_PASSWORD' });
    expect(mockSend).toHaveBeenCalledWith({ type: 'SIGN_IN' });
    expect(mockSend).toHaveBeenCalledWith({ type: 'SIGN_UP' });
    expect(mockSend).toHaveBeenCalledWith({ type: 'SKIP' });
  });
});

describe('getServiceContextFacade', () => {
  it('returns the expected service context facade when unauthenticated', () => {
    const state = {
      value: 'unauthenticated',
      hasTag: (tag: string) => false,
      matches: (state: string) => false,
      context: {
        user: undefined,
        config: {
          socialProviders: ['amazon'],
        },
      },
    } as AuthMachineState;
    const facade = getServiceContextFacade(state);

    expect(facade.authStatus).toBe('unauthenticated');
    expect(facade.user).toEqual(undefined);
    expect(facade.socialProviders).toEqual(['amazon']);
  });

  it('returns the expected service context facade for getCurrentUser', () => {
    const state = {
      value: 'signIn.runActor',
      hasTag: (tag: string) => false,
      matches: (state: string) => state === 'getCurrentUser',
      context: {
        user: undefined,
        config: {
          socialProviders: ['amazon'],
        },
      },
    } as unknown as AuthMachineState;
    const facade = getServiceContextFacade(state);

    expect(facade.route).toBe('transition');
    expect(facade.user).toEqual(undefined);
    expect(facade.socialProviders).toEqual(['amazon']);
  });

  it('returns the expected service context facade for setupTotp', () => {
    const state = {
      value: 'setupTotp.submit',
      hasTag: (tag: string) => false,
      matches: (state: string) => state === 'setupTotp.submit',
      context: {
        user: undefined,
        config: {
          socialProviders: ['amazon'],
        },
      },
    } as unknown as AuthMachineState;
    const facade = getServiceContextFacade(state);

    expect(facade.route).toBe('setupTotp');
    expect(facade.user).toEqual(undefined);
    expect(facade.socialProviders).toEqual(['amazon']);
  });

  it.each(['idle', 'setup'])(
    'returns the expected service context facade for %s',
    (status: string) => {
      const state = {
        value: status,
        hasTag: (tag: string) => false,
        matches: (state: string) => state === status,

        context: {
          user: undefined,
        },
      } as AuthMachineState;
      const facade = getServiceContextFacade(state);

      expect(facade.authStatus).toBe('configuring');
      expect(facade.route).toBe(status);
      expect(facade.user).toEqual(undefined);
    }
  );

  it('returns the expected service context facade when authenticated', () => {
    const state = {
      value: 'authenticated',
      hasTag: (tag: string) => false,
      matches: (state: string) => state === 'authenticated',

      context: {
        user: { username: 'testName', userId: 'testId' },
        config: {
          socialProviders: ['amazon'],
        },
      },
    } as unknown as AuthMachineState;
    const facade = getServiceContextFacade(state);

    expect(facade.authStatus).toBe('authenticated');
    expect(facade.user).toEqual({ username: 'testName', userId: 'testId' });
    expect(facade.socialProviders).toEqual(['amazon']);
  });

  // @todo-migration fix, the below strings need to be audited as:
  // - some do not correspond to a state
  // - are now available as on actorState
  it.skip.each([
    'confirmResetPassword',
    'confirmSignIn',
    'confirmSignUp',
    'confirmVerifyUser',
    'forceNewPassword',
    'forgotPassword',
    'signIn',
    'signOut',
    'signUp',
    'verifyUser',
  ])('returns the expected service context facade for %s', (status: string) => {
    const state = {
      value: status,
      hasTag: (tag: string) => false,
      matches: (state: string) => state === status,

      context: {
        user: undefined,
        config: {
          socialProviders: ['amazon'],
        },
      },
    } as AuthMachineState;
    const facade = getServiceContextFacade(state);

    expect(facade.authStatus).toBe('unauthenticated');
    expect(facade.route).toBe(status);
    expect(facade.user).toEqual(undefined);
    expect(facade.socialProviders).toEqual(['amazon']);
  });
});

describe('getServiceFacade', () => {
  const send = jest.fn();
  const state = {
    value: 'idle',
    context: {},
    hasTag: () => false,
    matches: () => false,
  } as unknown as AuthMachineState;

  it('returns expected methods and properties', () => {
    const serviceFacade = getServiceFacade({ send, state });

    expect(serviceFacade).toHaveProperty('authStatus');
    expect(serviceFacade).toHaveProperty('route');
    expect(serviceFacade).toHaveProperty('user');
    expect(serviceFacade).toHaveProperty('route');
  });
});

describe('getNextServiceFacade', () => {
  const send = jest.fn();
  const state = {
    value: 'idle',
    context: {},
    hasTag: () => false,
    matches: () => false,
  } as unknown as AuthMachineState;

  it('returns expected methods and properties', () => {
    const serviceFacade = getNextServiceFacade({ send, state });

    expect(serviceFacade).not.toHaveProperty('authStatus');
    expect(serviceFacade).toHaveProperty('route');
    expect(serviceFacade).not.toHaveProperty('user');
    expect(serviceFacade).toHaveProperty('username');
    expect(serviceFacade).toHaveProperty('route');
  });
});
