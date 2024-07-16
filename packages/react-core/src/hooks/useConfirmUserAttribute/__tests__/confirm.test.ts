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
  beforeAll(jest.clearAllMocks);
  beforeEach(jest.clearAllMocks);

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
    expect(result.current[0].message).toBe(String(mockError));
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
    expect(result.current[0].data).toBe(undefined);
  });

  it('should have data as undefined', async () => {
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
    expect(result.current[0].message).toBe(undefined);
  });
});
