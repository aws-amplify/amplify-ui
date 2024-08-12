import useIsSignedIn from '../useIsSignedIn';
import { act, renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import * as AuthModule from 'aws-amplify/auth';
import { GetCurrentUserOutput } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';

const getCurrentUserSpy = jest.spyOn(AuthModule, 'getCurrentUser');

const MOCK_ERROR = new Error('Authorization error');
const MOCK_SUCCESS: GetCurrentUserOutput = {
  username: 'username',
  userId: '123',
};
const EXPECTED_LOADING_STATE = {
  data: false,
  hasError: false,
  isLoading: true,
  message: undefined,
};
const EXPECTED_ERROR_STATE = {
  data: false,
  hasError: true,
  isLoading: false,
  message: 'Authorization error',
};
const EXPECTED_ACCEPTED_STATE = {
  data: true,
  hasError: false,
  isLoading: false,
  message: undefined,
};

describe('useIsSignedIn', () => {
  it('should have an intermediate loading state before receiving false and error', async () => {
    getCurrentUserSpy.mockImplementationOnce(async () => {
      return new Promise((_, reject) => {
        setTimeout(() => {
          reject(MOCK_ERROR);
        }, 10);
      });
    });

    const { result } = renderHook(() => useIsSignedIn());

    expect(result.current).toEqual(EXPECTED_LOADING_STATE);

    await waitFor(() => {
      expect(result.current).toEqual(EXPECTED_ERROR_STATE);
    });
  });

  it('should have an intermediate loading state before receiving true', async () => {
    getCurrentUserSpy.mockImplementationOnce(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(MOCK_SUCCESS);
        }, 10);
      });
    });

    const { result } = renderHook(() => useIsSignedIn());

    expect(result.current).toEqual(EXPECTED_LOADING_STATE);

    await waitFor(() => {
      expect(result.current).toEqual(EXPECTED_ACCEPTED_STATE);
    });
  });

  it('should be true if receiving a signedIn event', async () => {
    getCurrentUserSpy.mockRejectedValueOnce(MOCK_ERROR);
    getCurrentUserSpy.mockResolvedValueOnce(MOCK_SUCCESS);

    const { result } = renderHook(() => useIsSignedIn());
    expect(result.current).toEqual(EXPECTED_LOADING_STATE);

    await waitFor(() => {
      expect(result.current).toEqual(EXPECTED_ERROR_STATE);
    });

    act(() => {
      Hub.dispatch('auth', { event: 'signedIn' });
    });

    await waitFor(() => {
      expect(result.current).toEqual(EXPECTED_ACCEPTED_STATE);
    });
  });

  it('should be false if receiving a signedOut event', async () => {
    getCurrentUserSpy.mockResolvedValueOnce(MOCK_SUCCESS);
    getCurrentUserSpy.mockRejectedValueOnce(MOCK_ERROR);
    getCurrentUserSpy.mockRejectedValueOnce(MOCK_ERROR);

    const { result } = renderHook(() => useIsSignedIn());

    await waitFor(() => {
      expect(result.current).toEqual(EXPECTED_ACCEPTED_STATE);
    });

    act(() => {
      Hub.dispatch('auth', { event: 'signedOut' });
    });

    await waitFor(() => {
      expect(result.current).toEqual(EXPECTED_ERROR_STATE);
    });
  });

  it('should be able to listen to multiple events after one call', async () => {
    getCurrentUserSpy.mockRejectedValueOnce(MOCK_ERROR);
    getCurrentUserSpy.mockResolvedValueOnce(MOCK_SUCCESS);
    getCurrentUserSpy.mockRejectedValueOnce(MOCK_ERROR);
    getCurrentUserSpy.mockRejectedValueOnce(MOCK_ERROR);
    getCurrentUserSpy.mockResolvedValueOnce(MOCK_SUCCESS);

    const { result } = renderHook(() => useIsSignedIn());

    await waitFor(() => {
      expect(result.current).toEqual(EXPECTED_ERROR_STATE);
    });

    act(() => {
      Hub.dispatch('auth', { event: 'signedIn' });
    });

    await waitFor(() => {
      expect(result.current).toEqual(EXPECTED_ACCEPTED_STATE);
    });

    act(() => {
      Hub.dispatch('auth', { event: 'signedOut' });
    });

    await waitFor(() => {
      expect(result.current).toEqual(EXPECTED_ERROR_STATE);
    });

    act(() => {
      Hub.dispatch('auth', { event: 'signedIn' });
    });

    await waitFor(() => {
      expect(result.current).toEqual(EXPECTED_ACCEPTED_STATE);
    });
  });
});
