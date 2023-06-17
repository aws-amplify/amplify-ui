import { interpret } from 'xstate';
import { setImmediate } from 'timers';

import {
  ResetPasswordMachineOptions,
  resetPasswordActor,
} from '../resetPassword';
import { SignInResult } from '../../../../types';

const flushPromises = () => new Promise(setImmediate);

let service;
const mockResendCode = jest.fn(() => Promise.resolve);
const mockValidateFields = jest.fn(async () => Promise.resolve);
const mockHandleForgotPassword = jest.fn(async () => Promise.resolve);
const mockHandleForgotPasswordSubmit = jest.fn(
  async () => Promise.resolve as unknown as Promise<SignInResult>
);

const resetPasswordMachineProps: ResetPasswordMachineOptions = {
  services: {
    handleForgotPassword: mockHandleForgotPassword,
    handleForgotPasswordSubmit: mockHandleForgotPasswordSubmit,
  },
};
const mockUsername = 'test';
const mockPassword = 'test';
const mockConfirmationCode = '1234';

describe('resetPasswordActor', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    service.stop();
  });

  it('transitions from initial state to edit on RESET_PASSWORD event', async () => {
    service = interpret(
      resetPasswordActor(resetPasswordMachineProps)
        .withContext({
          intent: 'test',
          username: mockUsername,
          formValues: {
            confirmation_code: mockConfirmationCode,
            password: mockPassword,
          },
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
            resendCode: mockResendCode,
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
    expect(mockResendCode).not.toHaveBeenCalled();

    expect(service.getSnapshot().value).toStrictEqual({
      resetPassword: 'edit',
    });
    service.send({ type: 'RESET_PASSWORD' });

    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      resetPassword: 'edit',
    });

    service.send({
      type: 'SUBMIT',
      data: { confirm_password: mockPassword, password: mockPassword },
    });

    await flushPromises();
    expect(mockHandleForgotPassword).toHaveBeenCalledWith(mockUsername);
    expect(service.getSnapshot().value).toStrictEqual({
      confirmResetPassword: { submission: 'idle', validation: 'valid' },
    });
    expect(mockValidateFields).toHaveBeenCalled();

    service.send({
      type: 'SUBMIT',
    });
    await flushPromises();
    expect(mockHandleForgotPasswordSubmit).toHaveBeenCalledWith({
      code: mockConfirmationCode,
      password: mockPassword,
      username: mockUsername,
    });
    expect(service.getSnapshot().value).toStrictEqual('resolved');
  });

  it('should resend code', async () => {
    service = interpret(
      resetPasswordActor({})
        .withContext({ intent: 'confirmPasswordReset' })
        .withConfig({
          actions: {
            clearFormValues: jest.fn(),
            clearError: jest.fn(),
            clearTouched: jest.fn(),
            clearUsername: jest.fn(),
            clearValidationError: jest.fn(),
            resendCode: mockResendCode,
            sendUpdate: jest.fn(async () => Promise.resolve),
            setUsername: jest.fn(),
          },
        })
    );

    service.start();
    expect(mockResendCode).toHaveBeenCalled();
  });
});
