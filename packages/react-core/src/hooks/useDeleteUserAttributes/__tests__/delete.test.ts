import { act, renderHook } from '@testing-library/react-hooks';

import {
  deleteUserAttributes,
  DeleteUserAttributesInput,
} from '@aws-amplify/auth';

import { useDeleteUserAttributes } from '../constants';

jest.mock('@aws-amplify/auth', () => ({
  deleteUserAttributes: jest.fn(),
}));

const mockInput: DeleteUserAttributesInput = {
  userAttributeKeys: ['nickname', 'locale'],
};

const mockError = new Error('Sample error');

const mockOutput = undefined;

describe('useDeleteUserAttributes', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(jest.clearAllMocks);
  beforeAll(jest.clearAllMocks);
  beforeEach(jest.clearAllMocks);

  it('data should be falsy if error received', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useDeleteUserAttributes()
    );
    (deleteUserAttributes as jest.Mock).mockRejectedValueOnce(mockError);
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
      useDeleteUserAttributes()
    );

    (deleteUserAttributes as jest.Mock).mockRejectedValue(mockError);

    act(async () => {
      await new Promise<void>((resolve) => {
        result.current[1](mockInput);
        resolve();
      });
    });

    await waitForNextUpdate();

    expect(result.current[0].message).toBe(String(mockError));
  });
  it('should have data as undefined', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useDeleteUserAttributes()
    );
    (deleteUserAttributes as jest.Mock).mockResolvedValue(mockOutput);

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
