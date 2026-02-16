import { interpret } from 'xstate';
import { setImmediate } from 'timers';

import * as AuthModule from 'aws-amplify/auth';

import { SignInMachineOptions, signInActor } from '../signIn';

const flushPromises = () => new Promise(setImmediate);

let service;
const mockHandleSignIn = jest.fn(async () => Promise.resolve) as unknown as ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => Promise<AuthModule.SignInOutput>;
const mockHandleConfirmSignIn = jest.fn(
  async () => Promise.resolve
) as unknown as (
  input: AuthModule.ConfirmSignInInput
) => Promise<AuthModule.ConfirmSignInOutput>;
const mockUsername = 'test';
const mockPassword = 'test';
const mockUserId = '1234';
const mockConfirmationCode = '1234';
const mockPhoneNumber = '123456789';

const signInMachineProps: SignInMachineOptions = {
  services: {
    handleSignIn: mockHandleSignIn,
    handleConfirmSignIn: mockHandleConfirmSignIn,
  },
};

const getCurrentUserSpy = jest
  .spyOn(AuthModule, 'getCurrentUser')
  .mockResolvedValue({ userId: mockUserId, username: mockUsername });
const completeNewPasswordSpy = jest
  .spyOn(AuthModule, 'confirmResetPassword')
  .mockResolvedValue();
const verifyTotpTokenSpy = jest
  .spyOn(AuthModule, 'verifyTOTPSetup')
  .mockResolvedValue();
const federatedSignInSpy = jest
  .spyOn(AuthModule, 'signInWithRedirect')
  .mockResolvedValue();
const verifiedContactSpy = jest
  .spyOn(AuthModule, 'fetchUserAttributes')
  .mockResolvedValue({} as never);
const verifyCurrentUserAttributeSpy = jest
  .spyOn(AuthModule, 'updateUserAttribute')
  .mockResolvedValue({
    isUpdated: true,
    nextStep: { updateAttributeStep: 'DONE' },
  });
const verifyCurrentUserAttributeSubmitSpy = jest
  .spyOn(AuthModule, 'confirmUserAttribute')
  .mockResolvedValue({} as never);

describe('signInActor', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    service.stop();
  });

  // @todo-migration fix
  it.skip('transitions from initial state to resolved on SIGN_IN', async () => {
    service = interpret(
      signInActor(signInMachineProps)
        .withContext({
          loginMechanisms: ['email'],
          socialProviders: [],
          step: 'SIGN_IN',
        })
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
            verifyUser: jest.fn(async () => Promise.resolve),
          },
          guards: {
            shouldRequestVerification: jest.fn(() => false),
          },
        })
    );

    service.start();

    expect(service.getSnapshot().value).toStrictEqual({ signIn: 'edit' });
    const credentials = { username: mockUsername, password: mockPassword };
    service.send({
      type: 'SUBMIT',
      data: credentials,
    });
    await flushPromises();
    expect(mockHandleSignIn).toHaveBeenCalledWith(credentials);
    expect(service.getSnapshot().value).toStrictEqual('resolved');
  });

  // @todo-migration fix
  it.skip('should handle federated signin', async () => {
    service = interpret(
      signInActor(signInMachineProps)
        .withContext({
          loginMechanisms: ['email'],
          socialProviders: [],
          step: 'SIGN_IN',
        })
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
            verifyUser: jest.fn(async () => Promise.resolve),
          },
          guards: {
            shouldRequestVerification: jest.fn(() => false),
          },
        })
    );

    service.start();

    expect(service.getSnapshot().value).toStrictEqual({ signIn: 'edit' });
    const provider = { provider: 'Apple' };
    service.send({
      type: 'FEDERATED_SIGN_IN',
      data: provider,
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      signIn: 'federatedSignIn',
    });

    service.send({
      type: 'SUBMIT',
    });
    await flushPromises();
    expect(federatedSignInSpy).toHaveBeenCalledWith(provider);
  });

  // @todo-migration
  // expect(verifiedContactSpy).toHaveBeenCalledTimes(1);
  // received number of calls: 2
  it.skip('should check verified contact', async () => {
    service = interpret(
      signInActor(signInMachineProps)
        .withContext({
          user: { username: mockUsername, userId: 'userId' },
          loginMechanisms: ['email'],
          socialProviders: [],
          step: 'SIGN_IN',
        })
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
          guards: {
            shouldRequestVerification: jest.fn(() => true),
          },
        })
    );

    service.start();

    expect(service.getSnapshot().value).toStrictEqual({ signIn: 'edit' });

    service.send({
      type: 'SUBMIT',
    });
    await flushPromises();
    expect(verifiedContactSpy).toHaveBeenCalledTimes(1);
    expect(service.getSnapshot().value).toStrictEqual({ verifyUser: 'edit' });
    service.send({
      type: 'SUBMIT',
    });
    await flushPromises();
    expect(verifyCurrentUserAttributeSpy).toHaveBeenCalledTimes(1);

    expect(service.getSnapshot().value).toStrictEqual({
      confirmVerifyUser: 'edit',
    });

    service.send({
      type: 'SUBMIT',
    });
    await flushPromises();
    expect(verifyCurrentUserAttributeSubmitSpy).toHaveBeenCalledTimes(1);
    expect(service.getSnapshot().value).toStrictEqual('resolved');
  });

  // @todo-migration
  //   - Expected  - 1
  //   + Received  + 1
  //   Object {
  // -   "autoSignIn": "pending",
  // +   "autoSignIn": "signIn",
  //   }
  it.skip('transitions to resolved when autosignIn is enabled', async () => {
    service = interpret(
      signInActor(signInMachineProps)
        .withContext({
          loginMechanisms: ['email'],
          socialProviders: [],
          step: 'SIGN_IN',
        })
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
            verifyUser: jest.fn(async () => Promise.resolve),
          },
          guards: {
            shouldConfirmSignInWithNewPassword: jest.fn(() => false),
          },
        })
    );

    service.start();

    expect(service.getSnapshot().value).toStrictEqual({
      autoSignIn: 'signIn',
    });
    const credentials = { username: mockUsername, password: mockPassword };
    service.send({
      type: 'AUTO_SIGN_IN_FAILURE',
      data: credentials,
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual('resolved');
  });

  // @todo-migration
  // expect(jest.fn()).toHaveBeenCalledTimes(expected)
  // Expected number of calls: 1
  // Received number of calls: 2
  it.skip('transitions to confirmSignIn when challengeName is SMS_MFA', async () => {
    service = interpret(
      signInActor(signInMachineProps)
        .withContext({
          challengeName: 'SMS_MFA',
          user: {
            username: mockUsername,
            userId: 'userId',
          },
          formValues: {
            confirmation_code: mockConfirmationCode,
          },

          loginMechanisms: ['email'],
          socialProviders: [],
          step: 'SIGN_IN',
        })
        .withConfig({
          actions: {
            clearFormValues: jest.fn(),
            clearError: jest.fn(),
            clearTouched: jest.fn(),
            resendCode: jest.fn(),
            sendUpdate: jest.fn(() => Promise.resolve),
            setUnverifiedUserAttributes: jest.fn(),
            setUser: jest.fn(),
            setChallengeName: jest.fn(),
          },
          services: {
            checkVerifiedContact: jest.fn(async () => Promise.resolve),
            verifyUser: jest.fn(async () => Promise.resolve),
          },
          guards: {
            shouldRequestVerification: jest.fn(() => false),

            shouldConfirmSignInWithNewPassword: jest.fn(() => false),
            shouldConfirmSignIn: jest.fn(() => true),
          },
        })
    );

    service.start();

    expect(service.getSnapshot().value).toStrictEqual({ signIn: 'edit' });
    service.send({
      type: 'SUBMIT',
    });
    await flushPromises();

    expect(service.getSnapshot().value).toStrictEqual({
      confirmSignIn: 'edit',
    });
    service.send({
      type: 'SUBMIT',
    });

    await flushPromises();

    expect(mockHandleConfirmSignIn).toHaveBeenCalledWith({
      challengeResponse: mockConfirmationCode,
    });

    expect(getCurrentUserSpy).toHaveBeenCalledTimes(1);
    expect(service.getSnapshot().value).toStrictEqual('resolved');
  });

  // @todo-migration
  // Expected: {"username": "test"}, "test", {"confirmation_code": "1234"}
  // Number of calls: 0
  it.skip('transitions to forceNewPassword when challengeName is NEW_PASSWORD_REQUIRED', async () => {
    service = interpret(
      signInActor(signInMachineProps)
        .withContext({
          challengeName: 'NEW_PASSWORD_REQUIRED',
          user: {
            username: mockUsername,
            userId: 'userId',
          },
          formValues: {
            confirmation_code: mockConfirmationCode,
            password: mockPassword,
          },

          loginMechanisms: ['email'],
          socialProviders: [],
          step: 'SIGN_IN',
        })
        .withConfig({
          actions: {
            clearFormValues: jest.fn(),
            clearError: jest.fn(),
            clearTouched: jest.fn(),
            resendCode: jest.fn(),
            sendUpdate: jest.fn(() => Promise.resolve),
            setMissingAtttributes: jest.fn(),
            setUnverifiedUserAttributes: jest.fn(),
            setUser: jest.fn(),
            setChallengeName: jest.fn(),
          },
          services: {
            checkVerifiedContact: jest.fn(async () => Promise.resolve),
            verifyUser: jest.fn(async () => Promise.resolve),
            validateFields: jest.fn(async () => Promise.resolve),
          },
          guards: {
            shouldRequestVerification: jest.fn(() => false),

            shouldConfirmSignInWithNewPassword: jest.fn(() => true),
            shouldConfirmSignIn: jest.fn(() => false),
          },
        })
    );

    service.start();

    expect(service.getSnapshot().value).toStrictEqual({ signIn: 'edit' });
    service.send({
      type: 'SUBMIT',
    });
    await flushPromises();

    expect(service.getSnapshot().value).toStrictEqual({
      forceNewPassword: { submit: 'idle', validation: 'valid' },
    });
    service.send({
      type: 'SUBMIT',
    });

    await flushPromises();
    expect(completeNewPasswordSpy).toHaveBeenCalledWith(
      { username: mockUsername },
      mockPassword,
      { confirmation_code: mockConfirmationCode }
    );
    expect(service.getSnapshot().value).toStrictEqual('resolved');
  });

  // @todo-migration
  // Expected: {"username": "test"}, "1234"
  // Number of calls: 0
  it.skip('transitions to setupTotp when challengeName is MFA_SETUP', async () => {
    service = interpret(
      signInActor(signInMachineProps)
        .withContext({
          challengeName: 'MFA_SETUP',
          user: {
            username: mockUsername,
            userId: 'userId',
          },
          formValues: {
            confirmation_code: mockConfirmationCode,
            password: mockPassword,
            phone_number: mockPhoneNumber,
          },

          loginMechanisms: ['email'],
          socialProviders: [],
          step: 'SIGN_IN',
        })
        .withConfig({
          actions: {
            clearFormValues: jest.fn(),
            clearError: jest.fn(),
            clearTouched: jest.fn(),
            resendCode: jest.fn(),
            sendUpdate: jest.fn(() => Promise.resolve),
            setMissingAtttributes: jest.fn(),
            setUnverifiedUserAttributes: jest.fn(),
            setUser: jest.fn(),
            setChallengeName: jest.fn(),
          },
          services: {
            checkVerifiedContact: jest.fn(async () => Promise.resolve),
            verifyUser: jest.fn(async () => Promise.resolve),
            validateFields: jest.fn(async () => Promise.resolve),
          },
          guards: {
            shouldRequestVerification: jest.fn(() => false),

            shouldConfirmSignInWithNewPassword: jest.fn(() => false),
            shouldConfirmSignIn: jest.fn(() => false),
          },
        })
    );

    service.start();

    expect(service.getSnapshot().value).toStrictEqual({ signIn: 'edit' });
    service.send({
      type: 'SUBMIT',
    });
    await flushPromises();

    expect(service.getSnapshot().value).toStrictEqual({
      setupTotp: 'edit',
    });
    service.send({
      type: 'SUBMIT',
    });

    await flushPromises();
    expect(verifyTotpTokenSpy).toHaveBeenCalledWith(
      { username: mockUsername },
      mockConfirmationCode
    );
    expect(service.getSnapshot().value).toStrictEqual('resolved');
  });

  // @todo-migration fix and re-enable
  it.skip('redirects if password reset is required', async () => {
    service = interpret(
      signInActor({
        services: {
          handleSignIn: jest
            .fn()
            .mockRejectedValue({ code: 'PasswordResetRequiredException' }),
        },
      })
        .withContext({
          loginMechanisms: ['email'],
          socialProviders: [],
          step: 'SIGN_IN',
        })
        .withConfig({
          actions: {
            clearFormValues: jest.fn(),
            clearError: jest.fn(),
            clearTouched: jest.fn(),
            resendCode: jest.fn(),
            sendUpdate: jest.fn(() => Promise.reject),
            setUnverifiedUserAttributes: jest.fn(),
            setUsernameAuthAttributes: jest.fn(() => Promise.resolve),
            setConfirmSignUpIntent: jest.fn(() => Promise.resolve),
          },
          services: {
            checkVerifiedContact: jest.fn(async () => Promise.resolve),
            verifyUser: jest.fn(async () => Promise.resolve),
          },
          guards: {
            shouldRequestVerification: jest.fn(() => false),
          },
        })
    );

    service.start();

    expect(service.getSnapshot().value).toStrictEqual({ signIn: 'edit' });
    const credentials = { username: mockUsername, password: mockPassword };
    service.send({
      type: 'SUBMIT',
      data: credentials,
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual('rejected');
  });

  // @todo-migration
  // Expected: "rejected"
  // Received: {"signIn": "edit"}
  it.skip('redirects if user is not confirmed', async () => {
    service = interpret(
      signInActor({
        services: {
          handleSignIn: jest.fn(async () => {
            throw { code: 'UserNotConfirmedException' };
          }),
        },
      })
        .withContext({
          loginMechanisms: ['email'],
          socialProviders: [],
          step: 'SIGN_IN',
        })
        .withConfig({
          actions: {
            clearFormValues: jest.fn(),
            clearError: jest.fn(),
            clearTouched: jest.fn(),
            resendCode: jest.fn(),
            sendUpdate: jest.fn(() => Promise.resolve),
            setUnverifiedUserAttributes: jest.fn(),
            setUsername: jest.fn(),
            setUsernameAuthAttributes: jest.fn(() => Promise.resolve),
            setConfirmResetPasswordIntent: jest.fn(() => Promise.resolve),
          },
          services: {
            checkVerifiedContact: jest.fn(async () => Promise.resolve),
            verifyUser: jest.fn(async () => Promise.resolve),
          },
          guards: {
            shouldRequestVerification: jest.fn(() => false),
          },
        })
    );

    service.start();

    expect(service.getSnapshot().value).toStrictEqual({ signIn: 'edit' });
    const credentials = { username: mockUsername, password: mockPassword };
    service.send({
      type: 'SUBMIT',
      data: credentials,
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual('rejected');
  });

  describe('handleForceChangePassword service', () => {
    let confirmSignInSpy: jest.SpyInstance;
    let testService: any;

    beforeEach(() => {
      confirmSignInSpy = jest
        .spyOn(AuthModule, 'confirmSignIn')
        .mockResolvedValue({
          isSignedIn: true,
          nextStep: { signInStep: 'DONE' },
        } as any);

      // Initialize a dummy service to prevent afterEach errors
      testService = { stop: jest.fn() };
      service = testService;
    });

    afterEach(() => {
      confirmSignInSpy.mockRestore();
    });

    it('should exclude username from userAttributes when calling confirmSignIn', async () => {
      const machine = signInActor(signInMachineProps);

      // Get the service function from the machine's options
      const services = (machine as any).options.services;
      const handleForceChangePassword = services.handleForceChangePassword;

      const context = {
        formValues: {
          password: 'newPassword123!',
          confirm_password: 'newPassword123!',
          username: 'testuser@example.com',
          email: 'testuser@example.com',
          name: 'Test User',
        },
      };

      await handleForceChangePassword(context, {} as any);

      expect(confirmSignInSpy).toHaveBeenCalledWith({
        challengeResponse: 'newPassword123!',
        options: {
          userAttributes: {
            email: 'testuser@example.com',
            name: 'Test User',
          },
        },
      });

      // Verify username and confirm_password are NOT in userAttributes
      const callArgs = confirmSignInSpy.mock.calls[0][0];
      expect(callArgs.options.userAttributes).not.toHaveProperty('username');
      expect(callArgs.options.userAttributes).not.toHaveProperty(
        'confirm_password'
      );
    });

    it('should format phone number with country code and exclude from userAttributes', async () => {
      const machine = signInActor(signInMachineProps);

      const services = (machine as any).options.services;
      const handleForceChangePassword = services.handleForceChangePassword;

      const context = {
        formValues: {
          password: 'newPassword123!',
          confirm_password: 'newPassword123!',
          username: 'testuser',
          phone_number: '555-1234',
          country_code: '+1',
          email: 'test@example.com',
        },
      };

      await handleForceChangePassword(context, {} as any);

      expect(confirmSignInSpy).toHaveBeenCalledWith({
        challengeResponse: 'newPassword123!',
        options: {
          userAttributes: {
            phone_number: '+15551234',
            email: 'test@example.com',
          },
        },
      });

      // Verify username, confirm_password, and country_code are NOT in userAttributes
      const callArgs = confirmSignInSpy.mock.calls[0][0];
      expect(callArgs.options.userAttributes).not.toHaveProperty('username');
      expect(callArgs.options.userAttributes).not.toHaveProperty(
        'confirm_password'
      );
      expect(callArgs.options.userAttributes).not.toHaveProperty(
        'country_code'
      );
    });

    it('should handle empty userAttributes when only password fields are provided', async () => {
      const machine = signInActor(signInMachineProps);

      const services = (machine as any).options.services;
      const handleForceChangePassword = services.handleForceChangePassword;

      const context = {
        formValues: {
          password: 'newPassword123!',
          confirm_password: 'newPassword123!',
          username: 'testuser',
        },
      };

      await handleForceChangePassword(context, {} as any);

      expect(confirmSignInSpy).toHaveBeenCalledWith({
        challengeResponse: 'newPassword123!',
        options: {
          userAttributes: {},
        },
      });
    });
  });
});
