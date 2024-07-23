import useIsSignedIn from '../useIsSignedIn';
import { act, renderHook } from '@testing-library/react-hooks';
import * as AuthModule from 'aws-amplify/auth';
import { GetCurrentUserOutput } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';

const getCurrentUserSpy = jest.spyOn(AuthModule, 'getCurrentUser');

const mockError = new Error('Authorization error');
const mockSuccess: GetCurrentUserOutput = {
  username: 'username',
  userId: '123',
};

describe('useIsSignedIn', () => {
  it('should be false if user is not signed in', () => {
    getCurrentUserSpy.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useIsSignedIn());
    expect(result.current).toBe(false);
  });

  it('should be truth if user is already signed in', async () => {
    const mockUserCredentials: GetCurrentUserOutput = {
      username: 'username',
      userId: '123',
    };
    getCurrentUserSpy.mockResolvedValueOnce(mockUserCredentials);

    const { result, waitForNextUpdate } = renderHook(() => useIsSignedIn());
    expect(result.current).toBe(false);

    await waitForNextUpdate();
    expect(result.current).toBe(true);
  });

  it('should be true if receiving a signedIn event', () => {
    getCurrentUserSpy.mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderHook(() => useIsSignedIn());
    expect(result.current).toBe(false);

    waitForNextUpdate();

    act(() => {
      Hub.dispatch('auth', { event: 'signedIn' });
    });
    expect(result.current).toBe(true);
  });

  it('should be false if receiving a signedOut event', async () => {
    getCurrentUserSpy.mockResolvedValueOnce(mockSuccess);

    const { result, waitForNextUpdate } = renderHook(() => useIsSignedIn());

    await waitForNextUpdate();
    expect(result.current).toBe(true);

    act(() => {
      Hub.dispatch('auth', { event: 'signedOut' });
    });
    expect(result.current).toBe(false);
  });

  it('should be able to listen to multiple events after one call', () => {
    getCurrentUserSpy.mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderHook(() => useIsSignedIn());

    waitForNextUpdate();

    act(() => {
      Hub.dispatch('auth', { event: 'signedIn' });
    });
    expect(result.current).toBe(true);

    act(() => {
      Hub.dispatch('auth', { event: 'signedOut' });
    });
    expect(result.current).toBe(false);

    act(() => {
      Hub.dispatch('auth', { event: 'signedIn' });
    });
    expect(result.current).toBe(true);
  });
});
