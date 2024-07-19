import { act, renderHook } from '@testing-library/react-hooks';

import {
  confirmUserAttribute,
  ConfirmUserAttributeInput,
} from '@aws-amplify/auth';

import { useConfirmUserAttribute } from '../constants';

jest.mock('@aws-amplify/auth', () => ({
  confirmUserAttribute: jest.fn(),
}));

const mockInput: ConfirmUserAttributeInput = {
  userAttributeKey: 'email',
  confirmationCode: 'abc123',
};

const mockError = new Error('Sample error');

const mockOutput = undefined;

describe('useConfirmUserAttribute', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(jest.clearAllMocks);

  it('data should be falsy if error received', async () => {
    (confirmUserAttribute as jest.Mock).mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderHook(() =>
      useConfirmUserAttribute()
    );
    act(async () => {
      await new Promise<void>((resolve) => {
        result.current[1](mockInput);
        resolve();
      });
    });

    await waitForNextUpdate();

    expect(result.current[0].data).toBeFalsy();
  });

  it('hasError should be truthy if error occured', async () => {
    (confirmUserAttribute as jest.Mock).mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderHook(() =>
      useConfirmUserAttribute()
    );
    act(async () => {
      await new Promise<void>((resolve) => {
        result.current[1](mockInput);
        resolve();
      });
    });

    await waitForNextUpdate();

    expect(result.current[0].hasError).toBeTruthy();
  });

  it('should have an error message if error occurs', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useConfirmUserAttribute()
    );
    (confirmUserAttribute as jest.Mock).mockRejectedValue(mockError);

    act(async () => {
      await new Promise<void>((resolve) => {
        result.current[1](mockInput);
        resolve();
      });
    });

    await waitForNextUpdate();

    expect(result.current[0].message).toBe(String(mockError));
  });

  it('should have data as undefined if successful', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useConfirmUserAttribute()
    );
    (confirmUserAttribute as jest.Mock).mockResolvedValue(mockOutput);

    act(async () => {
      await new Promise<void>((resolve) => {
        result.current[1](mockInput);
        resolve();
      });
    });

    await waitForNextUpdate();
    expect(result.current[0].data).toBe(undefined);
  });

  it('hasError should be falsy if successful', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useConfirmUserAttribute()
    );
    (confirmUserAttribute as jest.Mock).mockResolvedValue(mockOutput);

    act(async () => {
      await new Promise<void>((resolve) => {
        result.current[1](mockInput);
        resolve();
      });
    });

    await waitForNextUpdate();

    expect(result.current[0].hasError).toBeFalsy();
  });
  it('should not have a message if successful', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useConfirmUserAttribute()
    );
    (confirmUserAttribute as jest.Mock).mockResolvedValue(mockOutput);

    act(async () => {
      await new Promise<void>((resolve) => {
        result.current[1](mockInput);
        resolve();
      });
    });

    await waitForNextUpdate();
    expect(result.current[0].message).toBeFalsy();
  });
});
