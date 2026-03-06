import { act, renderHook, waitFor } from '@testing-library/react';

import * as AuthModule from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';

import { useAuth } from '../useAuth';

const getCurrentUserSpy = jest.spyOn(AuthModule, 'getCurrentUser');

// hub events that return valid user object
const SUCCESS_EVENTS_WITH_USER = ['signIn', 'signUp', 'autoSignIn'];

// hub events that return error object
const FAILURE_EVENTS_WITH_ERROR = ['tokenRefresh_failure', 'signIn_failure'];

const mockCognitoUser = {
  username: 'johndoe',
  attributes: {
    phone_number: '+1-234-567-890',
    email: 'john@doe.com',
  },
  userId: 'user-id',
};

describe('useAuth', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return default values when initialized', async () => {
    getCurrentUserSpy.mockRejectedValue(undefined);

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.user).toBe(undefined);
      expect(result.current.isLoading).toBe(true);
      expect(result.current.error).toBeUndefined();
    });
  });

  it('should invoke getCurrentUser function', async () => {
    getCurrentUserSpy.mockResolvedValue(mockCognitoUser);

    renderHook(() => useAuth());

    await waitFor(() => {
      expect(getCurrentUserSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('should set an error when something unexpected happen', async () => {
    getCurrentUserSpy.mockRejectedValue(new Error('Unknown error'));

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.error).not.toBeUndefined();
    });
  });

  it('should retrieve a Cognito user', async () => {
    getCurrentUserSpy.mockResolvedValue(mockCognitoUser);

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.error).toBeUndefined();
      expect(result.current.user).toBe(mockCognitoUser);
    });
  });

  it.each(SUCCESS_EVENTS_WITH_USER)(
    'should receive a Cognito user on %s Hub event',
    async () => {
      // turn off warning logs in console
      jest.spyOn(console, 'warn').mockImplementation();

      getCurrentUserSpy.mockRejectedValue(undefined);

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.user).toBe(undefined);
      });

      // Simulate Auth sign in Hub action
      act(() => {
        Hub.dispatch('auth', { event: 'signedIn', data: mockCognitoUser });
      });

      expect(result.current.user).toBe(mockCognitoUser);
    }
  );

  it('should should unset user on signOut Hub event', async () => {
    // turn off warning logs in console
    jest.spyOn(console, 'warn').mockImplementation();

    getCurrentUserSpy.mockResolvedValue(mockCognitoUser);

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.user).toBe(mockCognitoUser);
    });

    // Simulate Auth sign out Hub action
    act(() => {
      Hub.dispatch('auth', { event: 'signedOut' });
    });

    expect(result.current.user).toBeUndefined();
  });

  it('invokes getCurrentUser on tokenRefresh event', async () => {
    getCurrentUserSpy.mockResolvedValue(mockCognitoUser);

    renderHook(() => useAuth());

    // Simulate Auth tokenRefresh Hub action
    act(() => {
      Hub.dispatch('auth', { event: 'tokenRefresh' });
    });

    await waitFor(() => {
      expect(getCurrentUserSpy).toHaveBeenCalled();
    });
  });

  it.each(FAILURE_EVENTS_WITH_ERROR)(
    'returns error on %s event',
    async (event) => {
      getCurrentUserSpy.mockResolvedValue(mockCognitoUser);

      const { result } = renderHook(() => useAuth());

      act(() => {
        Hub.dispatch('auth', {
          event,
          data: new Error('mock auth error'),
        });
      });

      await waitFor(() => {
        expect(result.current.user).toBeUndefined();
        expect(result.current.error?.message).toBe('mock auth error');
      });
    }
  );

  it('returns error on autoSignIn_failure event', async () => {
    getCurrentUserSpy.mockResolvedValue(mockCognitoUser);

    const { result } = renderHook(() => useAuth());

    act(() => {
      // adapted from https://github.com/aws-amplify/amplify-js/blob/272c2c607cc4adb5ddc9421444887bdb382227a0/packages/auth/src/Auth.ts#L274-L278
      Hub.dispatch('auth', {
        event: 'autoSignIn_failure',
        // autoSignIn_failure event only contains `message` but not `payload`.
        message: 'autoSignInError',
      });
    });

    await waitFor(() => {
      expect(result.current.user).toBeUndefined();
      expect(result.current.error?.message).toBe('autoSignInError');
    });
  });
});
