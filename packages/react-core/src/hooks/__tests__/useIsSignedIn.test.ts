import useIsSignedIn from '../useIsSignedIn';
import { act, renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import * as AuthModule from 'aws-amplify/auth';
import { GetCurrentUserOutput } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';

const getCurrentUserSpy = jest.spyOn(AuthModule, 'getCurrentUser');

const mockError = new Error('Authorization error');
const mockSuccess: GetCurrentUserOutput = {
  username: 'username',
  userId: '123',
};
const expectedDefaultState = {
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
  message: 'Authorization error',
};
const expectedAcceptedState = {
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
          reject(mockError);
        }, 10);
      });
    });

    const { result } = renderHook(() => useIsSignedIn());

    expect(result.current).toEqual(expectedLoadingState);

    await waitFor(() => {
      expect(result.current).toEqual(expectedErrorState);
    });
  });

  it('should have an intermediate loading state before receiving true', async () => {
    getCurrentUserSpy.mockImplementationOnce(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockSuccess);
        }, 10);
      });
    });

    const { result } = renderHook(() => useIsSignedIn());

    expect(result.current).toEqual(expectedLoadingState);

    await waitFor(() => {
      expect(result.current).toEqual(expectedAcceptedState);
    });
  });

  it('should be true if receiving a signedIn event', async () => {
    getCurrentUserSpy.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useIsSignedIn());
    expect(result.current).toEqual(expectedLoadingState);

    await waitFor(() => {
      expect(result.current).toEqual(expectedErrorState);
    });

    act(() => {
      Hub.dispatch('auth', { event: 'signedIn' });
    });

    expect(result.current).toEqual(expectedAcceptedState);
  });

  it('should be false if receiving a signedOut event', async () => {
    getCurrentUserSpy.mockResolvedValueOnce(mockSuccess);

    const { result } = renderHook(() => useIsSignedIn());

    await waitFor(() => {
      expect(result.current).toEqual(expectedAcceptedState);
    });

    act(() => {
      Hub.dispatch('auth', { event: 'signedOut' });
    });

    expect(result.current).toEqual(expectedDefaultState);
  });

  it('should be able to listen to multiple events after one call', () => {
    getCurrentUserSpy.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useIsSignedIn());

    act(() => {
      Hub.dispatch('auth', { event: 'signedIn' });
    });

    expect(result.current).toEqual(expectedAcceptedState);

    act(() => {
      Hub.dispatch('auth', { event: 'signedOut' });
    });

    expect(result.current).toEqual(expectedDefaultState);

    act(() => {
      Hub.dispatch('auth', { event: 'signedIn' });
    });

    expect(result.current).toEqual(expectedAcceptedState);
  });
});
