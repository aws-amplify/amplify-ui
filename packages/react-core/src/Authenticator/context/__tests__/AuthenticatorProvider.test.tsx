import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import { Hub } from 'aws-amplify/utils';
import * as Auth from 'aws-amplify/auth';
import * as UIModule from '@aws-amplify/ui';

import { useAuthenticator } from '../..';
import { AuthenticatorProvider } from '..';

// mock `aws-amplify` to prevent logging auth errors during test runs
jest.mock('aws-amplify');

const hubListenSpy = jest.spyOn(Hub, 'listen');
const listenToAuthHubSpy = jest.spyOn(UIModule, 'listenToAuthHub');
const getCurrentUserSpy = jest
  .spyOn(Auth, 'getCurrentUser')
  .mockResolvedValue({ userId: '1234', username: 'test' });

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
  // @todo-migration
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('returns the expected value of auth status on init when a user is not signed in', async () => {
    getCurrentUserSpy.mockRejectedValueOnce(undefined);

    const { getByText } = render(
      <AuthenticatorProvider>
        <TestComponent />
      </AuthenticatorProvider>
    );

    expect(getCurrentUserSpy).toHaveBeenCalledTimes(2);

    expect(getByText('configuring')).toBeDefined();

    await waitFor(() => {
      expect(getByText('unauthenticated')).toBeDefined();
    });
  });

  // @todo-migration
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('returns the expected value of auth status on init when a user is signed in', async () => {
    const { getByText } = render(
      <AuthenticatorProvider>
        <TestComponent />
      </AuthenticatorProvider>
    );

    expect(getCurrentUserSpy).toHaveBeenCalledTimes(2);

    expect(getByText('configuring')).toBeDefined();

    await waitFor(() => {
      expect(getByText('authenticated')).toBeDefined();
    });
  });
});
