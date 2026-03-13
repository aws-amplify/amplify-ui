import { interpret } from 'xstate';
import { setImmediate } from 'timers';

import * as AuthModule from 'aws-amplify/auth';

import { SignUpMachineOptions, signUpActor } from '../signUp';
import { SignUpContext } from '../../types';
import guards from '../../guards';

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
    service?.stop();
  });

  // New tests for shouldManualSignIn guard
  describe('shouldManualSignIn guard', () => {
    const createMockContext = (step: string) =>
      ({
        step,
        loginMechanisms: ['username'],
        socialProviders: [],
        formValues: {},
        touched: {},
        validationError: {},
      }) as any;

    const createMockEvent = (signUpStep: string) => ({
      type: 'done.invoke.confirmSignUp' as any,
      data: {
        nextStep: { signUpStep },
      },
    });

    it('should return true when nextStep is DONE and contextStep is CONFIRM_SIGN_UP', () => {
      const context = createMockContext('CONFIRM_SIGN_UP');
      const event = createMockEvent('DONE');
      const meta = {} as any;

      const result = guards.shouldManualSignIn(context, event, meta);
      expect(result).toBe(true);
    });

    it('should return false when nextStep is COMPLETE_AUTO_SIGN_IN', () => {
      const context = createMockContext('CONFIRM_SIGN_UP');
      const event = createMockEvent('COMPLETE_AUTO_SIGN_IN');
      const meta = {} as any;

      const result = guards.shouldManualSignIn(context, event, meta);
      expect(result).toBe(false);
    });

    it('should return false when contextStep is not CONFIRM_SIGN_UP', () => {
      const context = createMockContext('SIGN_UP');
      const event = createMockEvent('DONE');
      const meta = {} as any;

      const result = guards.shouldManualSignIn(context, event, meta);
      expect(result).toBe(false);
    });

    it('should return false when nextStep is not DONE', () => {
      const context = createMockContext('CONFIRM_SIGN_UP');
      const event = createMockEvent('CONFIRM_SIGN_UP');
      const meta = {} as any;

      const result = guards.shouldManualSignIn(context, event, meta);
      expect(result).toBe(false);
    });
  });

  describe('confirmSignUp with shouldManualSignIn', () => {
    it('should transition to resolved with SIGN_IN step when shouldManualSignIn is true', async () => {
      const mockConfirmSignUp = jest.fn().mockResolvedValue({
        nextStep: { signUpStep: 'DONE' },
      });

      service = interpret(
        signUpActor(signUpMachineProps)
          .withContext({
            step: 'CONFIRM_SIGN_UP',
            username: mockUsername,
            formValues: {
              confirmation_code: mockConfirmationCode,
            },
            loginMechanisms: ['username'],
          } as unknown as SignUpContext)
          .withConfig({
            actions: {
              clearFormValues: jest.fn(),
              clearError: jest.fn(),
              clearTouched: jest.fn(),
              sendUpdate: jest.fn(),
              setNextSignUpStep: jest.fn(),
              setSignInStep: (context) => {
                context.step = 'SIGN_IN';
              },
            },
            services: {
              confirmSignUp: mockConfirmSignUp,
              validateSignUp: jest.fn().mockResolvedValue(null),
            },
            guards: {
              shouldAutoSignIn: jest.fn(() => false),
              shouldManualSignIn: jest.fn(() => true),
            },
          })
      );

      service.start();

      // Submit confirmation code
      service.send({ type: 'SUBMIT' });
      await flushPromises();

      // Should reach resolved state
      expect(service.getSnapshot().value).toBe('resolved');

      // Should have called setSignInStep action and set step to 'SIGN_IN'
      expect(service.getSnapshot().context.step).toBe('SIGN_IN');
    });
  });

  describe('confirmSignUp flow with refresh scenario', () => {
    it('should route directly to resolved when coming from sign-in flow', async () => {
      const mockConfirmSignUp = jest.fn().mockResolvedValue({
        nextStep: { signUpStep: 'DONE' },
      });

      service = interpret(
        signUpActor(signUpMachineProps)
          .withContext({
            step: 'CONFIRM_SIGN_UP', // This indicates refresh scenario
            username: mockUsername,
            formValues: {
              confirmation_code: mockConfirmationCode,
            },
            loginMechanisms: ['username'],
          } as unknown as SignUpContext)
          .withConfig({
            actions: {
              clearFormValues: jest.fn(),
              clearError: jest.fn(),
              sendUpdate: jest.fn(),
              setNextSignUpStep: jest.fn(),
              setSignInStep: jest.fn(),
            },
            services: {
              confirmSignUp: mockConfirmSignUp,
            },
          })
      );

      service.start();

      // Submit confirmation
      service.send({ type: 'SUBMIT' });
      await flushPromises();

      // Verify confirmSignUp was called (with full context as first parameter)
      expect(mockConfirmSignUp).toHaveBeenCalled();

      // Verify the service was called with context containing the right data
      const callArgs = mockConfirmSignUp.mock.calls[0][0];
      expect(callArgs.username).toBe(mockUsername);
      expect(callArgs.formValues.confirmation_code).toBe(mockConfirmationCode);

      // Should reach resolved state directly
      expect(service.getSnapshot().value).toBe('resolved');
    });
  });

  // @todo-migration
  //   TypeError: Cannot destructure property 'codeDeliveryDetails' of '((cov_orv9ttv7g(...).s[75]++) , data.nextStep)' as it is undefined.
  //   TypeError: Cannot destructure property 'codeDeliveryDetails' of '((cov_orv9ttv7g(...).s[75]++) , data.nextStep)' as it is undefined.
  it.skip('should transition from initial state to resolved', async () => {
    service = interpret(
      signUpActor(signUpMachineProps)
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
            setUnverifiedUserAttributes: jest.fn(),
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
      signUpActor(signUpMachineProps)
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
            setUnverifiedUserAttributes: jest.fn(),
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
      signUpActor({})
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
            setUnverifiedUserAttributes: jest.fn(),
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
      signUpActor({})
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
            setUnverifiedUserAttributes: jest.fn(),
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
