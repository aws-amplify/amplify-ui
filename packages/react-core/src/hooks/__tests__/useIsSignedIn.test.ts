import useIsSignedIn from '../useIsSignedIn';
import { act, renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import * as AuthModule from 'aws-amplify/auth';
import { GetCurrentUserOutput } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import { AuthError } from 'aws-amplify/auth';

const getCurrentUserSpy = jest.spyOn(AuthModule, 'getCurrentUser');

const USER_UNAUTHENTICATED_EXCEPTION = 'UserUnAuthenticatedException';

const authErrorResult = new AuthError({
  name: USER_UNAUTHENTICATED_EXCEPTION,
  message: 'User needs to be authenticated to call this API.',
  recoverySuggestion: 'Sign in before calling this API again.',
});

const nonAuthErrorResule = new Error('Non-Authorization error');

const successResult: GetCurrentUserOutput = {
  username: 'username',
  userId: '123',
};
const expectedSignedOutState = {
  data: { isSignedIn: false },
  hasError: false,
  isLoading: false,
  message: undefined,
};
const expectedLoadingState = {
  data: { isSignedIn: false },
  hasError: false,
  isLoading: true,
  message: undefined,
};
const expectedErrorState = {
  data: { isSignedIn: false },
  hasError: true,
  isLoading: false,
  message: 'Non-Authorization error',
};
const expectedSignedInState = {
  data: { isSignedIn: true },
  hasError: false,
  isLoading: false,
  message: undefined,
};

describe('useIsSignedIn', () => {
  it('should have an intermediate loading state before receiving false and error', async () => {
    getCurrentUserSpy.mockImplementationOnce(async () => {
      return new Promise((_, reject) => {
        setTimeout(() => {
          reject(authErrorResult);
        }, 10);
      });
    });

    const { result } = renderHook(() => useIsSignedIn());

    expect(result.current).toEqual(expectedLoadingState);

    await waitFor(() => {
      expect(result.current).toEqual(expectedSignedOutState);
    });
  });

  it('should have an intermediate loading state before receiving true', async () => {
    getCurrentUserSpy.mockImplementationOnce(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(successResult);
        }, 10);
      });
    });

    const { result } = renderHook(() => useIsSignedIn());

    expect(result.current).toEqual(expectedLoadingState);

    await waitFor(() => {
      expect(result.current).toEqual(expectedSignedInState);
    });
  });

  it('should be true if receiving a signedIn event', async () => {
    getCurrentUserSpy.mockRejectedValueOnce(authErrorResult);

    const { result } = renderHook(() => useIsSignedIn());
    expect(result.current).toEqual(expectedLoadingState);

    await waitFor(() => {
      expect(result.current).toEqual(expectedSignedOutState);
    });

    act(() => {
      Hub.dispatch('auth', { event: 'signedIn' });
    });

    expect(result.current).toEqual(expectedSignedInState);
  });

  it('should be false if receiving a signedOut event', async () => {
    getCurrentUserSpy.mockResolvedValueOnce(successResult);

    const { result } = renderHook(() => useIsSignedIn());

    await waitFor(() => {
      expect(result.current).toEqual(expectedSignedInState);
    });

    act(() => {
      Hub.dispatch('auth', { event: 'signedOut' });
    });

    expect(result.current).toEqual(expectedSignedOutState);
  });

  it('should be able to listen to multiple events after one call', () => {
    getCurrentUserSpy.mockRejectedValueOnce(authErrorResult);

    const { result } = renderHook(() => useIsSignedIn());

    act(() => {
      Hub.dispatch('auth', { event: 'signedIn' });
    });

    expect(result.current).toEqual(expectedSignedInState);

    act(() => {
      Hub.dispatch('auth', { event: 'signedOut' });
    });

    expect(result.current).toEqual(expectedSignedOutState);

    act(() => {
      Hub.dispatch('auth', { event: 'signedIn' });
    });

    expect(result.current).toEqual(expectedSignedInState);
  });

  it('should have an error in state if there is a non-authorization error', async () => {
    getCurrentUserSpy.mockImplementationOnce(async () => {
      return new Promise((_, reject) => {
        setTimeout(() => {
          reject(nonAuthErrorResule);
        }, 10);
      });
    });

    const { result } = renderHook(() => useIsSignedIn());

    expect(result.current).toEqual(expectedLoadingState);

    await waitFor(() => {
      expect(result.current).toEqual(expectedErrorState);
    });
  });
});
