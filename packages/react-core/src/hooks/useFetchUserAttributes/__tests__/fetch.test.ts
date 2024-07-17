import { act, renderHook } from '@testing-library/react-hooks';

import {
  FetchUserAttributesOutput,
  fetchUserAttributes,
} from '@aws-amplify/auth';

import { DefaultAttributes, useFetchUserAttributes } from '../constants';

jest.mock('@aws-amplify/auth', () => ({
  fetchUserAttributes: jest.fn(),
}));

describe('useFetchUserAttributes', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(jest.clearAllMocks);

  it('data should be DefaultAttributes if error received', async () => {
    const mockError = new Error('Sample error');
    (fetchUserAttributes as jest.Mock).mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchUserAttributes()
    );
    expect(result.current[0].data).toBe(DefaultAttributes);
    act(result.current[1]);

    await waitForNextUpdate();

    expect(result.current[0].data).toBe(DefaultAttributes);
  });
  it('hasError should be truthy if error occurs', async () => {
    const mockError = new Error('Sample error');
    (fetchUserAttributes as jest.Mock).mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchUserAttributes()
    );
    act(result.current[1]);

    await waitForNextUpdate();

    expect(result.current[0].hasError).toBeTruthy();
  });

  it('message should be the error message if error occurs', async () => {
    const mockError = new Error('Sample error');
    (fetchUserAttributes as jest.Mock).mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchUserAttributes()
    );
    act(result.current[1]);

    await waitForNextUpdate();

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
    expect(result.current[0].hasError).toBeTruthy();
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

    expect(result.current[0].data).toBe(DefaultAttributes);

    act(result.current[1]);

    await waitForNextUpdate();

    expect(result.current[0].data).toBe(mockUserAttributes);
  });

  it('hasError should be false if attributes received successfully', async () => {
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
    expect(result.current[0].data).toBe(DefaultAttributes);

    act(result.current[1]);

    await waitForNextUpdate();

    expect(result.current[0].data).toBe(mockUserAttributes);
    expect(result.current[0].hasError).toBeFalsy();
  });
  it('message should be undefined if successful fetch', async () => {
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
    expect(result.current[0].data).toBe(DefaultAttributes);

    act(result.current[1]);

    await waitForNextUpdate();

    expect(result.current[0].data).toBe(mockUserAttributes);
    expect(result.current[0].message).toBeFalsy();
  });
});
