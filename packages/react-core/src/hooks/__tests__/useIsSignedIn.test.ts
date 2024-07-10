import useIsSignedIn from '../useIsSignedIn';
import { act, renderHook } from '@testing-library/react-hooks';
import { getCurrentUser } from 'aws-amplify/auth';
import { GetCurrentUserOutput } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';

jest.mock('aws-amplify/auth', () => ({
  getCurrentUser: jest.fn(),
}));

describe('useIsSignedIn', () => {
  it('should be falsy if user is not signed in', () => {
    const mockError = new Error('Authorization error');
    (getCurrentUser as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useIsSignedIn());
    expect(result.current).toBeFalsy();
  });

  it('should be truthy if user is already signed in', async () => {
    const mockUserCredentials: GetCurrentUserOutput = {
      username: 'username',
      userId: '123',
    };
    (getCurrentUser as jest.Mock).mockResolvedValueOnce(mockUserCredentials);

    const { result, waitForNextUpdate } = renderHook(() => useIsSignedIn());
    expect(result.current).toBeFalsy();

    await waitForNextUpdate();
    expect(result.current).toBeTruthy();
  });

  it('should be truthy if receiving a signedIn event', () => {
    const mockError = new Error('Authorization error');
    (getCurrentUser as jest.Mock).mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderHook(() => useIsSignedIn());
    expect(result.current).toBeFalsy();

    waitForNextUpdate();

    act(() => {
      Hub.dispatch('auth', { event: 'signedIn' });
    });
    expect(result.current).toBeTruthy();
  });

  it('should be falsy if receiving a signedOut event', async () => {
    const mockUserCredentials: GetCurrentUserOutput = {
      username: 'username',
      userId: '123',
    };
    (getCurrentUser as jest.Mock).mockResolvedValueOnce(mockUserCredentials);

    const { result, waitForNextUpdate } = renderHook(() => useIsSignedIn());

    await waitForNextUpdate();
    expect(result.current).toBeTruthy();

    act(() => {
      Hub.dispatch('auth', { event: 'signedOut' });
    });
    expect(result.current).toBeFalsy();
  });

  it('should be able to listen to multiple events after one call', () => {
    const mockError = new Error('Authorization error');
    (getCurrentUser as jest.Mock).mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderHook(() => useIsSignedIn());

    waitForNextUpdate();

    act(() => {
      Hub.dispatch('auth', { event: 'signedIn' });
    });
    expect(result.current).toBeTruthy();

    act(() => {
      Hub.dispatch('auth', { event: 'signedOut' });
    });
    expect(result.current).toBeFalsy();

    act(() => {
      Hub.dispatch('auth', { event: 'signedIn' });
    });
    expect(result.current).toBeTruthy();
  });
});
