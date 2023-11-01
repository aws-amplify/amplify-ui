import { interpret } from 'xstate';
import { setImmediate } from 'timers';

import {
  ForgotPasswordMachineOptions,
  forgotPasswordActor,
} from '../forgotPassword';

import * as AuthModule from 'aws-amplify/auth';
import { ConfirmResetPasswordInput } from 'aws-amplify/auth';

const flushPromises = () => new Promise(setImmediate);

let service;
const resendSignUpCodeSpy = jest.spyOn(AuthModule, 'resendSignUpCode');
const mockValidateFields = jest.fn(async () => Promise.resolve);
const mockHandleForgotPassword = jest.fn(async () => Promise.resolve);
const mockHandleForgotPasswordSubmit = jest.fn(
  async () => Promise.resolve
) as unknown as (input: ConfirmResetPasswordInput) => Promise<Promise<void>>;

const forgotPasswordMachineProps: ForgotPasswordMachineOptions = {
  services: {
    handleForgotPassword: mockHandleForgotPassword,
    handleForgotPasswordSubmit: mockHandleForgotPasswordSubmit,
  },
} as unknown as ForgotPasswordMachineOptions;
const mockUsername = 'test';
const mockPassword = 'test';
const mockConfirmationCode = '1234';

describe('forgotPasswordActor', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    service.stop();
  });

  // @todo-migration fix
  it.skip('transitions from initial state to edit on RESET_PASSWORD event', async () => {
    service = interpret(
      forgotPasswordActor(forgotPasswordMachineProps)
        .withContext({
          username: mockUsername,
          formValues: {
            confirmation_code: mockConfirmationCode,
            password: mockPassword,
          },
          loginMechanisms: [],
          socialProviders: undefined,
          step: 'RESET_PASSWORD',
        })
        .withConfig({
          actions: {
            clearError: jest.fn(),
            clearFormValues: jest.fn(),
            clearTouched: jest.fn(),
            clearUsername: jest.fn(),
            clearValidationError: jest.fn(),
            handleBlur: jest.fn(),
            handleInput: jest.fn(),
            handleSubmit: jest.fn(),
            resendCode: resendSignUpCodeSpy as any,
            sendUpdate: jest.fn(async () => Promise.resolve),
            setFieldErrors: jest.fn(),
            setUsername: jest.fn(),
            setRemoteError: jest.fn(),
          },
          services: {
            validateFields: mockValidateFields,
          },
          guards: {
            shouldAutoConfirmReset: jest.fn(() => false),
          },
        })
    );

    service.start();
    expect(resendSignUpCodeSpy).not.toHaveBeenCalled();

    expect(service.getSnapshot().value).toStrictEqual({
      forgotPassword: 'edit',
    });
    service.send({ type: 'RESET_PASSWORD' });

    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      forgotPassword: 'edit',
    });

    service.send({
      type: 'SUBMIT',
      data: { confirm_password: mockPassword, password: mockPassword },
    });

    await flushPromises();
    expect(mockHandleForgotPassword).toHaveBeenCalledWith({
      username: mockUsername,
    });
    expect(service.getSnapshot().value).toStrictEqual({
      confirmResetPassword: { submission: 'idle', validation: 'valid' },
    });
    expect(mockValidateFields).toHaveBeenCalled();

    service.send({
      type: 'SUBMIT',
    });
    await flushPromises();
    expect(mockHandleForgotPasswordSubmit).toHaveBeenCalledWith({
      confirmationCode: mockConfirmationCode,
      newPassword: mockPassword,
      username: mockUsername,
    });
    expect(service.getSnapshot().value).toStrictEqual('resolved');
  });

  // @todo-migration fix
  it.skip('should resend code', async () => {
    service = interpret(
      forgotPasswordActor({})
        .withContext({
          step: 'RESET_PASSWORD',
          socialProviders: undefined,
          loginMechanisms: undefined,
        })
        .withConfig({
          actions: {
            clearFormValues: jest.fn(),
            clearError: jest.fn(),
            clearTouched: jest.fn(),
            clearUsername: jest.fn(),
            clearValidationError: jest.fn(),
            resendCode: resendSignUpCodeSpy as any,
            sendUpdate: jest.fn(async () => Promise.resolve),
            setUsername: jest.fn(),
          },
        })
    );

    service.start();
    expect(resendSignUpCodeSpy).toHaveBeenCalled();
  });
});
