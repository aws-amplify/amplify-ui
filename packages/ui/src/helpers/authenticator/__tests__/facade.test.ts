import { Sender } from 'xstate';

import { getSendEventAliases, getServiceContextFacade } from '../facade';
import { AmplifyUser, AuthEvent, AuthMachineState } from '../../../types';

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
      toResetPassword,
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
    toResetPassword();
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
    expect(mockSend).toHaveBeenCalledWith({ type: 'RESET_PASSWORD' });
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
        user: {
          username: 'test',
        } as AmplifyUser,
        config: {
          socialProviders: ['amazon'],
        },
      },
    } as AuthMachineState;
    const facade = getServiceContextFacade(state);

    expect(facade.authStatus).toBe('unauthenticated');
    expect(facade.user).toEqual({
      username: 'test',
    });
    expect(facade.socialProviders).toEqual(['amazon']);
  });

  it('returns the expected service context facade when idle', () => {
    const state = {
      value: 'idle',
      hasTag: (tag: string) => false,
      matches: (state: string) => (state === 'idle' ? true : false),

      context: {
        user: {
          username: 'test',
        } as AmplifyUser,
        config: {
          socialProviders: ['amazon'],
        },
      },
    } as AuthMachineState;
    const facade = getServiceContextFacade(state);

    expect(facade.authStatus).toBe('configuring');
    expect(facade.user).toEqual({
      username: 'test',
    });
    expect(facade.socialProviders).toEqual(['amazon']);
  });

  it('returns the expected service context facade when authenticated', () => {
    const state = {
      value: 'authenticated',
      hasTag: (tag: string) => false,
      matches: (state: string) => (state === 'authenticated' ? true : false),

      context: {
        user: {
          username: 'test',
        } as AmplifyUser,
        config: {
          socialProviders: ['amazon'],
        },
      },
    } as AuthMachineState;
    const facade = getServiceContextFacade(state);

    expect(facade.authStatus).toBe('authenticated');
    expect(facade.user).toEqual({
      username: 'test',
    });
    expect(facade.socialProviders).toEqual(['amazon']);
  });
});
