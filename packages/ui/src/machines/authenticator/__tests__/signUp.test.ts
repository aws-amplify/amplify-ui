import { interpret } from 'xstate';
import { setImmediate } from 'timers';

import { SignUpMachineOptions, createSignUpMachine } from '../signUp';
import { SignUpContext } from '../../../types';
import { Auth } from 'aws-amplify';

jest.mock('aws-amplify');

const flushPromises = () => new Promise(setImmediate);

let service;
const mockUsername = 'test';
const mockPassword = 'test';
const mockEmail = 'test@amazon.com';
const mockConfirmationCode = '1234';
const resendSignUpSpy = jest.spyOn(Auth, 'resendSignUp').mockResolvedValue({});
const mockHandleSignUp = jest.fn(async () => Promise.resolve as never);
const mockHandleConfirmSignUp = jest.fn(async () => Promise.resolve);
const signUpMachineProps: SignUpMachineOptions = {
  services: {
    handleSignUp: mockHandleSignUp,
    handleConfirmSignUp: mockHandleConfirmSignUp,
  },
};

describe('signUpActor', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    service.stop();
  });

  it('should transition from initial state to resolved', async () => {
    service = interpret(
      createSignUpMachine(signUpMachineProps)
        .withContext({
          formValues: {
            username: mockUsername,
            password: mockPassword,
            email: mockEmail,
          },
          loginMechanisms: ['username'],
        } as unknown as SignUpContext)
        .withConfig({
          actions: {
            clearFormValues: jest.fn(),
            clearError: jest.fn(),
            clearTouched: jest.fn(),
            resendCode: jest.fn(),
            sendUpdate: jest.fn(() => Promise.resolve),
            setUnverifiedContactMethods: jest.fn(),
            setUsername: jest.fn(),
          },
          services: {
            checkVerifiedContact: jest.fn(async () => Promise.resolve),
            confirmSignUp: jest.fn(async () => Promise.resolve),
            setAutoSignInIntent: jest.fn(async () => Promise.resolve),
            validateSignUp: jest.fn(async () => Promise.resolve),
          },
          guards: {
            isUserAlreadyConfirmed: jest.fn(() => false),
            shouldInitConfirmSignUp: jest.fn(() => false),
            shouldSkipConfirm: jest.fn(() => false),
          },
        })
    );
    service.start();

    expect(service.getSnapshot().value).toStrictEqual({
      signUp: { submission: 'idle', validation: 'pending' },
    });
    service.send({
      type: 'SIGN_UP',
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      signUp: { submission: 'idle', validation: 'valid' },
    });

    service.send({
      type: 'SUBMIT',
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      confirmSignUp: 'edit',
    });

    service.send({
      type: 'SUBMIT',
    });
    await flushPromises();
    expect(mockHandleSignUp).toHaveBeenCalledWith({
      attributes: { email: mockEmail },
      password: mockPassword,
      username: mockUsername,
    });
    expect(service.getSnapshot().value).toStrictEqual('resolved');
  });

  it('should transition to confirm signUp if intent is confirmSignUp', async () => {
    service = interpret(
      createSignUpMachine(signUpMachineProps)
        .withContext({
          intent: 'confirmSignUp',
          loginMechanisms: ['username'],
          formValues: {
            confirmation_code: mockConfirmationCode,
          },
          authAttributes: {
            username: mockUsername,
            password: mockPassword,
          },
        } as unknown as SignUpContext)
        .withConfig({
          actions: {
            clearFormValues: jest.fn(),
            clearError: jest.fn(),
            clearTouched: jest.fn(),
            resendCode: jest.fn(),
            sendUpdate: jest.fn(() => Promise.resolve),
            setUnverifiedContactMethods: jest.fn(),
            setUsername: jest.fn(),
          },
          services: {
            checkVerifiedContact: jest.fn(async () => Promise.resolve),
            setAutoSignInIntent: jest.fn(async () => Promise.resolve),
            signUp: jest.fn(async () => Promise.resolve),
            validateSignUp: jest.fn(async () => Promise.resolve),
          },
        })
    );
    service.start();

    expect(service.getSnapshot().value).toStrictEqual({
      confirmSignUp: 'edit',
    });
    service.send({
      type: 'SUBMIT',
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual('resolved');
  });

  it('should handle resending the confirmation code', async () => {
    service = interpret(
      createSignUpMachine({})
        .withContext({
          intent: 'confirmSignUp',
          authAttributes: {
            username: mockUsername,
            password: mockPassword,
          },
          loginMechanisms: ['username'],
        } as unknown as SignUpContext)
        .withConfig({
          actions: {
            clearFormValues: jest.fn(),
            clearError: jest.fn(),
            clearTouched: jest.fn(),
            resendCode: jest.fn(),
            sendUpdate: jest.fn(() => Promise.resolve),
            setUnverifiedContactMethods: jest.fn(),
            setUsername: jest.fn(),
          },
          services: {
            checkVerifiedContact: jest.fn(async () => Promise.resolve),
            confirmSignUp: jest.fn(async () => Promise.resolve),
            setAutoSignInIntent: jest.fn(async () => Promise.resolve),
            signUp: jest.fn(async () => Promise.resolve),
            validateSignUp: jest.fn(async () => Promise.resolve),
          },
          guards: {
            shouldSkipConfirm: jest.fn(() => false),
          },
        })
    );
    service.start();

    expect(service.getSnapshot().value).toStrictEqual({
      confirmSignUp: 'edit',
    });
    service.send({
      type: 'RESEND',
    });
    await flushPromises();
    expect(resendSignUpSpy).toHaveBeenCalledWith(mockUsername);
    expect(service.getSnapshot().value).toStrictEqual({
      confirmSignUp: 'edit',
    });
  });

  it('should handle resending the scenario when user is already confirmed', async () => {
    service = interpret(
      createSignUpMachine({})
        .withContext({
          intent: 'confirmSignUp',
          authAttributes: {
            username: mockUsername,
            password: mockPassword,
          },
          loginMechanisms: ['username'],
        } as unknown as SignUpContext)
        .withConfig({
          actions: {
            clearFormValues: jest.fn(),
            clearError: jest.fn(),
            clearTouched: jest.fn(),
            resendCode: jest.fn(),
            sendUpdate: jest.fn(() => Promise.resolve),
            setUnverifiedContactMethods: jest.fn(),
            setUsername: jest.fn(),
          },
          services: {
            checkVerifiedContact: jest.fn(async () => Promise.resolve),
            confirmSignUp: jest.fn(async () => Promise.resolve),
            setAutoSignInIntent: jest.fn(async () => Promise.resolve),
            signUp: jest.fn(async () => Promise.resolve),
            validateSignUp: jest.fn(async () => Promise.resolve),
            resendConfirmationCode: jest.fn(async () => {
              throw { message: 'User is already confirmed.' };
            }),
          },
          guards: {
            shouldSkipConfirm: jest.fn(() => false),
          },
        })
    );
    service.start();

    expect(service.getSnapshot().value).toStrictEqual({
      confirmSignUp: 'edit',
    });
    service.send({
      type: 'RESEND',
    });
    await flushPromises();
    expect(resendSignUpSpy).not.toHaveBeenCalled();
    expect(service.getSnapshot().value).toStrictEqual('resolved');
  });
});
