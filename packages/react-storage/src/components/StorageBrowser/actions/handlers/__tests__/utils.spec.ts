import * as StorageModule from 'aws-amplify/storage';

import { resolveHandlerResult } from '../utils';

const isCancelErrorSpy = jest.spyOn(StorageModule, 'isCancelError');

const onCancel = jest.fn();
const onComplete = jest.fn();
const onError = jest.fn();

const key = 'hello.png';

describe('resolveHandlerResult', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('behaves as expected in the happy path', async () => {
    const result = Promise.resolve();
    const output = resolveHandlerResult({ result, isCancelable: false, key });

    expect(await output).toBe('COMPLETE');
  });

  it('calls `onComplete` as expected', async () => {
    const result = Promise.resolve();

    await resolveHandlerResult({
      result,
      isCancelable: false,
      key,
      options: { onComplete },
    });

    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith(key);
  });

  it('behaves as expected on error', async () => {
    const result = Promise.reject();
    const output = resolveHandlerResult({ result, isCancelable: false, key });

    expect(await output).toBe('FAILED');
  });

  it('calls `onError` as expected', async () => {
    const error = new Error('oh no!');
    const result = Promise.reject(error);

    await resolveHandlerResult({
      result,
      isCancelable: false,
      key,
      options: { onError },
    });

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(key, error.message);
  });

  it('behaves as expected on cancelation', async () => {
    isCancelErrorSpy.mockReturnValueOnce(true);

    const result = Promise.reject();
    const output = resolveHandlerResult({ result, isCancelable: true, key });

    expect(await output).toBe('CANCELED');
  });

  it('calls `onCancel` as expected', async () => {
    isCancelErrorSpy.mockReturnValueOnce(true);

    const result = Promise.reject();

    await resolveHandlerResult({
      result,
      isCancelable: true,
      key,
      options: { onCancel },
    });

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledWith(key);
  });
});
