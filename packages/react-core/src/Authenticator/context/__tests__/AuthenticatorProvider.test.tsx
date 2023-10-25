import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import { Auth, Hub } from 'aws-amplify';
import * as UIModule from '@aws-amplify/ui';

import { useAuthenticator } from '../..';
import { AuthenticatorProvider } from '..';

// mock `aws-amplify` to prevent logging auth errors during test runs
jest.mock('aws-amplify');

const hubListenSpy = jest.spyOn(Hub, 'listen');
const listenToAuthHubSpy = jest.spyOn(UIModule, 'listenToAuthHub');
const currentAuthenticatedUserSpy = jest
  .spyOn(Auth, 'currentAuthenticatedUser')
  .mockResolvedValue(undefined);

function TestComponent(): JSX.Element | null {
  const { authStatus } = useAuthenticator();
  return <>{authStatus}</>;
}

describe('AuthenticatorProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('listens to Auth Hub events on init', async () => {
    render(
      <AuthenticatorProvider>
        <TestComponent />
      </AuthenticatorProvider>
    );

    await waitFor(() => {
      expect(hubListenSpy).toHaveBeenCalledTimes(1);
      expect(hubListenSpy).toHaveBeenCalledWith(
        'auth',
        expect.any(Function),
        'authenticator-hub-handler'
      );
    });
  });

  it('unsubscribes from listening on unmount', async () => {
    const unsubscribe = jest.fn();
    listenToAuthHubSpy.mockReturnValue(unsubscribe);
    const { unmount } = render(
      <AuthenticatorProvider>
        <TestComponent />
      </AuthenticatorProvider>
    );

    act(() => {
      unmount();
    });

    await waitFor(() => {
      expect(unsubscribe).toHaveBeenCalledTimes(1);
    });
  });

  it('returns the expected value of auth status on init when a user is not signed in', async () => {
    currentAuthenticatedUserSpy.mockRejectedValueOnce(undefined);

    const { getByText } = render(
      <AuthenticatorProvider>
        <TestComponent />
      </AuthenticatorProvider>
    );

    expect(currentAuthenticatedUserSpy).toHaveBeenCalledTimes(2);
    expect(getByText('configuring')).toBeDefined();

    await waitFor(() => {
      expect(getByText('unauthenticated')).toBeDefined();
    });
  });

  it('returns the expected value of auth status on init when a user is signed in', async () => {
    const { getByText } = render(
      <AuthenticatorProvider>
        <TestComponent />
      </AuthenticatorProvider>
    );

    expect(currentAuthenticatedUserSpy).toHaveBeenCalledTimes(2);
    expect(getByText('configuring')).toBeDefined();

    await waitFor(() => {
      expect(getByText('authenticated')).toBeDefined();
    });
  });
});
