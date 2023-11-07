import { interpret } from 'xstate';
import { setImmediate } from 'timers';

import * as AuthModule from 'aws-amplify/auth';

import { SignUpMachineOptions, createSignUpMachine } from '../signUp';
import { SignUpContext } from '../../../types';

jest.mock('aws-amplify');

const flushPromises = () => new Promise(setImmediate);

let service;
const mockUsername = 'test';
const mockPassword = 'test';
const mockEmail = 'test@amazon.com';
const mockConfirmationCode = '1234';

const resendSignUpCodeSpy = jest
  .spyOn(AuthModule, 'resendSignUpCode')
  .mockResolvedValue({});

const handleSignUpMock = jest.fn();
const signUpMachineProps: SignUpMachineOptions = {
  services: {
    handleSignUp: handleSignUpMock,
    handleConfirmSignUp: jest.fn(),
  },
};

describe('signUpActor', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    service.stop();
  });

  // @todo-migration
  //   TypeError: Cannot destructure property 'codeDeliveryDetails' of '((cov_orv9ttv7g(...).s[75]++) , data.nextStep)' as it is undefined.
  it.skip('should transition from initial state to resolved', async () => {
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
    expect(handleSignUpMock).toHaveBeenCalledWith({
      attributes: { email: mockEmail },
      password: mockPassword,
      username: mockUsername,
    });
    expect(service.getSnapshot().value).toStrictEqual('resolved');
  });

  // @todo-migration
  // expect(received).toStrictEqual(expected) // deep equality
  // Expected: "resolved"
  // Received: {"confirmSignUp": "submit"}
  it.skip('should transition to confirm signUp if intent is confirmSignUp', async () => {
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

  // @todo-migration
  //     expect(received).toStrictEqual(expected) // deep equality
  // Expected: "resolved"
  // Received: {"confirmSignUp": "submit"}
  it.skip('should handle resending the confirmation code', async () => {
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
    // @todo-migration
    // confirm this is the correct return
    expect(resendSignUpCodeSpy).toHaveBeenCalledWith({
      username: mockUsername,
    });
    expect(service.getSnapshot().value).toStrictEqual({
      confirmSignUp: 'edit',
    });
  });

  // @todo-migration
  // expect(received).toStrictEqual(expected) // deep equality
  // Expected: "resolved"
  // Received: {"confirmSignUp": "resend"}
  it.skip('should handle resending the scenario when user is already confirmed', async () => {
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
    expect(resendSignUpCodeSpy).not.toHaveBeenCalled();
    expect(service.getSnapshot().value).toStrictEqual('resolved');
  });
});
