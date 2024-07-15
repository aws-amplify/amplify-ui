import { act, renderHook } from '@testing-library/react-hooks';

import {
  FetchUserAttributesOutput,
  fetchUserAttributes,
} from '@aws-amplify/auth';

import { useFetchUserAttributes } from '../constants';

jest.mock('@aws-amplify/auth', () => ({
  fetchUserAttributes: jest.fn(),
}));

describe('useFetchUserAttributes', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(jest.clearAllMocks);
  beforeAll(jest.clearAllMocks);
  beforeEach(jest.clearAllMocks);

  it('data should be falsy if error received', async () => {
    const mockError = new Error('Sample error');
    (fetchUserAttributes as jest.Mock).mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchUserAttributes()
    );
    act(result.current[1]);

    await waitForNextUpdate();

    expect(result.current[0].data).toBeFalsy();
    expect(result.current[0].message).toBe(String(mockError));
  });

  it('should have an error message if an error occured', async () => {
    const mockError = new Error(`Sample error`);
    (fetchUserAttributes as jest.Mock).mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchUserAttributes()
    );
    act(result.current[1]);

    await waitForNextUpdate();

    expect(result.current[0].message).toBe(String(mockError));
  });

  it('data should be the attributes received', async () => {
    const mockUserAttributes: FetchUserAttributesOutput = {
      email: 'email@email.com',
      name: 'name',
    };
    (fetchUserAttributes as jest.Mock).mockResolvedValueOnce(
      mockUserAttributes
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchUserAttributes()
    );
    expect(result.current[0].data).toBeFalsy();
    act(result.current[1]);
    await waitForNextUpdate();

    expect(result.current[0].data).toBeTruthy();
    expect(result.current[0].data).toBe(mockUserAttributes);
    expect(result.current[0].message).toBe(undefined);
  });
});
