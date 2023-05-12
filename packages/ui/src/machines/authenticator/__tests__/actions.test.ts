import { Auth } from 'aws-amplify';
import {
  clearAttributeToVerify,
  handleSubmit,
  resendCode,
  setFieldErrors,
  setTotpSecretCode,
  setUsername,
  stopActor,
} from '../actions';

jest.mock('aws-amplify');

describe('stopActor', () => {
  it('should call xstate.stop', async () => {
    const machineId = '1234';
    const result = stopActor(machineId);

    expect(result.type).toStrictEqual('xstate.stop');
    expect(result.activity['id']).toStrictEqual(machineId);
  });
});

describe('clearAttributeToVerify', () => {
  it('should call xstate.assign', async () => {
    const result = clearAttributeToVerify;

    expect(result.type).toStrictEqual('xstate.assign');
    expect(result.assignment['attributeToVerify']).toStrictEqual(
      expect.any(Function)
    );
  });
});

describe('setTotpSecretCode', () => {
  it('should call xstate.assign', async () => {
    const result = setTotpSecretCode;

    expect(result.type).toStrictEqual('xstate.assign');
    expect(result.assignment['totpSecretCode']).toStrictEqual(
      expect.any(Function)
    );
  });
});

describe('setUsername', () => {
  it('should call xstate.assign', async () => {
    const result = setUsername;

    expect(result.type).toStrictEqual('xstate.assign');
    expect(result.assignment['username']).toStrictEqual(expect.any(Function));
  });
});

describe('setFieldErrors', () => {
  it('should call xstate.assign', async () => {
    const result = setFieldErrors;

    expect(result.type).toStrictEqual('xstate.assign');
    expect(result.assignment['validationError']).toStrictEqual(
      expect.any(Function)
    );
  });
});

describe('handleSubmit', () => {
  it('should call xstate.assign', async () => {
    const result = handleSubmit;

    expect(result.type).toStrictEqual('xstate.assign');
    expect(result.assignment['formValues']).toStrictEqual(expect.any(Function));
  });
});

describe('resendCode', () => {
  it('should call Auth.forgotPassword', async () => {
    const authSpy = jest.spyOn(Auth, 'forgotPassword');
    const mockUsername = 'test';
    resendCode({ username: mockUsername });

    expect(authSpy).toHaveBeenCalledWith(mockUsername);
  });
});
