import { actions, createMachine } from 'xstate';

import {
  clearAttributeToVerify,
  handleSubmit,
  setChallengeName,
  setFieldErrors,
  setTotpSecretCode,
  setUsername,
  stopActor,
} from '../actions';

const { assign } = actions;

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
