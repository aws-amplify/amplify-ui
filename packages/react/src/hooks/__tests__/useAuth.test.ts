import { Auth } from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import { act, renderHook } from '@testing-library/react-hooks';
import { useAuth } from '../useAuth';

const currentAuthenticatedUserSpy = jest.spyOn(
  Auth,
  'currentAuthenticatedUser'
);

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
};

describe('useAuth', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return default values when initialized', async () => {
    currentAuthenticatedUserSpy.mockResolvedValue(undefined);

    const { result, waitForNextUpdate } = renderHook(() => useAuth());

    expect(result.current.user).toBe(undefined);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeUndefined();

    await waitForNextUpdate();
  });

  it('should invoke Auth.currentAuthenticatedUser function', async () => {
    currentAuthenticatedUserSpy.mockResolvedValue(mockCognitoUser);

    const { waitForNextUpdate } = renderHook(() => useAuth());

    await waitForNextUpdate();

    expect(currentAuthenticatedUserSpy).toHaveBeenCalled();
  });

  it('should set an error when something unexpected happen', async () => {
    currentAuthenticatedUserSpy.mockRejectedValue(new Error('Unknown error'));

    const { result, waitForNextUpdate } = renderHook(() => useAuth());

    await waitForNextUpdate();

    expect(result.current.error).not.toBeUndefined();
  });

  it('should retrieve a Cognito user', async () => {
    currentAuthenticatedUserSpy.mockResolvedValue(mockCognitoUser);

    const { result, waitForNextUpdate } = renderHook(() => useAuth());

    await waitForNextUpdate();

    expect(result.current.error).toBeUndefined();
    expect(result.current.user).toBe(mockCognitoUser);
  });

  it.each(SUCCESS_EVENTS_WITH_USER)(
    'should receive a Cognito user on %s Hub event',
    async () => {
      currentAuthenticatedUserSpy.mockResolvedValue(undefined);

      const { result, waitForNextUpdate } = renderHook(() => useAuth());

      await waitForNextUpdate();

      expect(result.current.user).toBe(undefined);

      // Simulate Auth signIn Hub action
      act(() => {
        Hub.dispatch('auth', { event: 'signIn', data: mockCognitoUser });
      });

      expect(result.current.user).toBe(mockCognitoUser);
    }
  );

  it('should should unset user on Auth.signOut Hub event', async () => {
    currentAuthenticatedUserSpy.mockResolvedValue(mockCognitoUser);

    const { result, waitForNextUpdate } = renderHook(() => useAuth());

    await waitForNextUpdate();

    expect(result.current.user).toBe(mockCognitoUser);

    // Simulate Auth signOut Hub action
    act(() => {
      Hub.dispatch('auth', { event: 'signOut' });
    });

    expect(result.current.user).toBeUndefined();
  });

  it('invokes Auth.currentAuthenticatedUser on tokenRefresh event', async () => {
    currentAuthenticatedUserSpy.mockResolvedValue(mockCognitoUser);

    const { waitForNextUpdate } = renderHook(() => useAuth());
    await waitForNextUpdate();

    // Simulate Auth tokenRefresh Hub action
    act(() => {
      Hub.dispatch('auth', { event: 'tokenRefresh' });
    });

    expect(currentAuthenticatedUserSpy).toHaveBeenCalled();
  });

  it.each(FAILURE_EVENTS_WITH_ERROR)(
    'returns error on %s event',
    async (event) => {
      currentAuthenticatedUserSpy.mockResolvedValue(mockCognitoUser);

      const { result, waitForNextUpdate } = renderHook(() => useAuth());
      await waitForNextUpdate();

      act(() => {
        Hub.dispatch('auth', {
          event,
          data: new Error('mock auth error'),
        });
      });

      expect(result.current.user).toBeUndefined();
      expect(result.current.error?.message).toBe('mock auth error');
    }
  );

  it('returns error on autoSignIn_failure event', async () => {
    currentAuthenticatedUserSpy.mockResolvedValue(mockCognitoUser);

    const { result, waitForNextUpdate } = renderHook(() => useAuth());
    await waitForNextUpdate();

    act(() => {
      // adapted from https://github.com/aws-amplify/amplify-js/blob/272c2c607cc4adb5ddc9421444887bdb382227a0/packages/auth/src/Auth.ts#L274-L278
      Hub.dispatch('auth', {
        event: 'autoSignIn_failure',
        // autoSignIn_failure event only contains `message` but not `payload`.
        message: 'autoSignInError',
      });
    });

    expect(result.current.user).toBeUndefined();
    expect(result.current.error?.message).toBe('autoSignInError');
  });
});
