import { interpret } from 'xstate';
import { setImmediate } from 'timers';

import { SignInMachineOptions, signInActor } from '../signIn';
import { AmplifyUser } from '../../../../types';
import { Auth } from 'aws-amplify';

const flushPromises = () => new Promise(setImmediate);

let service;
const mockHandleSignIn = jest.fn(async () => Promise.resolve);
const mockHandleConfirmSignIn = jest.fn(async () => Promise.resolve);
const mockUsername = 'test';
const mockPassword = 'test';
const mockConfirmationCode = '1234';
const mockPhoneNumber = '123456789';

const signInMachineProps: SignInMachineOptions = {
  services: {
    handleSignIn: mockHandleSignIn,
    handleConfirmSignIn: mockHandleConfirmSignIn,
  },
};

const currentAuthenticatedUserSpy = jest
  .spyOn(Auth, 'currentAuthenticatedUser')
  .mockResolvedValue({});
const completeNewPasswordSpy = jest
  .spyOn(Auth, 'completeNewPassword')
  .mockResolvedValue({});
const verifyTotpTokenSpy = jest
  .spyOn(Auth, 'verifyTotpToken')
  .mockResolvedValue({} as never);
const federatedSignInSpy = jest
  .spyOn(Auth, 'federatedSignIn')
  .mockResolvedValue({} as never);
const verifiedContactSpy = jest
  .spyOn(Auth, 'verifiedContact')
  .mockResolvedValue({} as never);
const verifyCurrentUserAttributeSpy = jest
  .spyOn(Auth, 'verifyCurrentUserAttribute')
  .mockResolvedValue();
const verifyCurrentUserAttributeSubmitSpy = jest
  .spyOn(Auth, 'verifyCurrentUserAttributeSubmit')
  .mockResolvedValue({} as never);

describe('signInActor', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    service.stop();
  });

  it('transitions from initial state to resolved on SIGN_IN', async () => {
    service = interpret(
      signInActor(signInMachineProps)
        .withContext({
          intent: 'test',
          loginMechanisms: ['email'],
          socialProviders: [],
        })
        .withConfig({
          actions: {
            clearFormValues: jest.fn(),
            clearError: jest.fn(),
            clearTouched: jest.fn(),
            parsePhoneNumber: jest.fn(),
            resendCode: jest.fn(),
            sendUpdate: jest.fn(() => Promise.resolve),
            setUnverifiedContactMethods: jest.fn(),
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

  it('should handle federated signin', async () => {
    service = interpret(
      signInActor(signInMachineProps)
        .withContext({
          intent: 'test',
          loginMechanisms: ['email'],
          socialProviders: [],
        })
        .withConfig({
          actions: {
            clearFormValues: jest.fn(),
            clearError: jest.fn(),
            clearTouched: jest.fn(),
            parsePhoneNumber: jest.fn(),
            resendCode: jest.fn(),
            sendUpdate: jest.fn(() => Promise.resolve),
            setUnverifiedContactMethods: jest.fn(),
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

  it('should check verified contact', async () => {
    service = interpret(
      signInActor(signInMachineProps)
        .withContext({
          user: { username: mockUsername } as AmplifyUser,
          intent: 'test',
          loginMechanisms: ['email'],
          socialProviders: [],
        })
        .withConfig({
          actions: {
            clearFormValues: jest.fn(),
            clearError: jest.fn(),
            clearTouched: jest.fn(),
            parsePhoneNumber: jest.fn(),
            resendCode: jest.fn(),
            sendUpdate: jest.fn(() => Promise.resolve),
            setUnverifiedContactMethods: jest.fn(),
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

  it('transitions to resolved when autosignIn is enabled', async () => {
    service = interpret(
      signInActor(signInMachineProps)
        .withContext({
          intent: 'autoSignIn',
          loginMechanisms: ['email'],
          socialProviders: [],
        })
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
            verifyUser: jest.fn(async () => Promise.resolve),
          },
          guards: {
            shouldSetupTOTP: jest.fn(() => false),
            shouldForceChangePassword: jest.fn(() => false),
          },
        })
    );

    service.start();

    expect(service.getSnapshot().value).toStrictEqual({
      autoSignIn: 'pending',
    });
    const credentials = { username: mockUsername, password: mockPassword };
    service.send({
      type: 'AUTO_SIGN_IN',
      data: credentials,
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual('resolved');
  });

  it('transitions to confirmSignIn when challengeName is SMS_MFA', async () => {
    service = interpret(
      signInActor(signInMachineProps)
        .withContext({
          challengeName: 'SMS_MFA',
          user: {
            username: mockUsername,
          } as AmplifyUser,
          formValues: {
            confirmation_code: mockConfirmationCode,
          },
          intent: 'test',
          loginMechanisms: ['email'],
          socialProviders: [],
        })
        .withConfig({
          actions: {
            clearFormValues: jest.fn(),
            clearError: jest.fn(),
            clearTouched: jest.fn(),
            resendCode: jest.fn(),
            sendUpdate: jest.fn(() => Promise.resolve),
            setUnverifiedContactMethods: jest.fn(),
            setUser: jest.fn(),
            setChallengeName: jest.fn(),
          },
          services: {
            checkVerifiedContact: jest.fn(async () => Promise.resolve),
            verifyUser: jest.fn(async () => Promise.resolve),
          },
          guards: {
            shouldRequestVerification: jest.fn(() => false),
            shouldSetupTOTP: jest.fn(() => false),
            shouldForceChangePassword: jest.fn(() => false),
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
      code: mockConfirmationCode,
      mfaType: 'SMS_MFA',
      user: { username: mockUsername },
    });

    expect(currentAuthenticatedUserSpy).toHaveBeenCalledTimes(1);
    expect(service.getSnapshot().value).toStrictEqual('resolved');
  });

  it('transitions to forceNewPassword when challengeName is NEW_PASSWORD_REQUIRED', async () => {
    service = interpret(
      signInActor(signInMachineProps)
        .withContext({
          challengeName: 'NEW_PASSWORD_REQUIRED',
          user: {
            username: mockUsername,
          } as AmplifyUser,
          formValues: {
            confirmation_code: mockConfirmationCode,
            password: mockPassword,
          },
          intent: 'test',
          loginMechanisms: ['email'],
          socialProviders: [],
        })
        .withConfig({
          actions: {
            clearFormValues: jest.fn(),
            clearError: jest.fn(),
            clearTouched: jest.fn(),
            resendCode: jest.fn(),
            sendUpdate: jest.fn(() => Promise.resolve),
            setRequiredAttributes: jest.fn(),
            setUnverifiedContactMethods: jest.fn(),
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
            shouldSetupTOTP: jest.fn(() => false),
            shouldForceChangePassword: jest.fn(() => true),
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

  it('transitions to setupTOTP when challengeName is MFA_SETUP', async () => {
    service = interpret(
      signInActor(signInMachineProps)
        .withContext({
          challengeName: 'MFA_SETUP',
          user: {
            username: mockUsername,
          } as AmplifyUser,
          formValues: {
            confirmation_code: mockConfirmationCode,
            password: mockPassword,
            phone_number: mockPhoneNumber,
          },
          intent: 'test',
          loginMechanisms: ['email'],
          socialProviders: [],
        })
        .withConfig({
          actions: {
            clearFormValues: jest.fn(),
            clearError: jest.fn(),
            clearTouched: jest.fn(),
            resendCode: jest.fn(),
            sendUpdate: jest.fn(() => Promise.resolve),
            setRequiredAttributes: jest.fn(),
            setUnverifiedContactMethods: jest.fn(),
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
            shouldSetupTOTP: jest.fn(() => true),
            shouldForceChangePassword: jest.fn(() => false),
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
      setupTOTP: 'edit',
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

  it('redirects if password reset is required', async () => {
    service = interpret(
      signInActor({
        services: {
          handleSignIn: jest.fn(async () => {
            throw { code: 'PasswordResetRequiredException' };
          }),
        },
      })
        .withContext({
          intent: 'test',
          loginMechanisms: ['email'],
          socialProviders: [],
        })
        .withConfig({
          actions: {
            clearFormValues: jest.fn(),
            clearError: jest.fn(),
            clearTouched: jest.fn(),
            parsePhoneNumber: jest.fn(),
            resendCode: jest.fn(),
            sendUpdate: jest.fn(() => Promise.reject),
            setUnverifiedContactMethods: jest.fn(),
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

  it('redirects if user is not confirmed', async () => {
    service = interpret(
      signInActor({
        services: {
          handleSignIn: jest.fn(async () => {
            throw { code: 'UserNotConfirmedException' };
          }),
        },
      })
        .withContext({
          intent: 'test',
          loginMechanisms: ['email'],
          socialProviders: [],
        })
        .withConfig({
          actions: {
            clearFormValues: jest.fn(),
            clearError: jest.fn(),
            clearTouched: jest.fn(),
            parsePhoneNumber: jest.fn(),
            resendCode: jest.fn(),
            sendUpdate: jest.fn(() => Promise.resolve),
            setUnverifiedContactMethods: jest.fn(),
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
});
