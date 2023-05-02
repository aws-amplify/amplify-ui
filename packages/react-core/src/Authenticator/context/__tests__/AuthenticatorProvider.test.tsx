import React from 'react';
import { render } from '@testing-library/react';
import { Auth, Hub } from 'aws-amplify';
import * as UIModule from '@aws-amplify/ui';

import { useAuthenticator } from '../..';
import { AuthenticatorProvider } from '..';

// mock `aws-amplify` to prevent logging auth errors during test runs
jest.mock('aws-amplify');

const hubListenSpy = jest.spyOn(Hub, 'listen');
const currentAuthenticatedUserSpy = jest
  .spyOn(Auth, 'currentAuthenticatedUser')
  .mockResolvedValue(undefined);
const listenToAuthHubSpy = jest.spyOn(UIModule, 'listenToAuthHub');

function TestComponent(): JSX.Element | null {
  return null;
}

function AuthStatusComponent(): JSX.Element | null {
  const { authStatus } = useAuthenticator();
  return <>{authStatus}</>;
}

describe('AuthenticatorProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('listens to Auth Hub events on init', () => {
    render(
      <AuthenticatorProvider>
        <TestComponent />
      </AuthenticatorProvider>
    );

    expect(hubListenSpy).toBeCalledTimes(1);
    expect(hubListenSpy).toHaveBeenCalledWith(
      'auth',
      expect.any(Function),
      'authenticator-hub-handler'
    );
  });

  it('unsubscribes from listening on onmount', () => {
    const unsubscribe = jest.fn();
    listenToAuthHubSpy.mockReturnValue(unsubscribe);
    const { unmount } = render(
      <AuthenticatorProvider>
        <TestComponent />
      </AuthenticatorProvider>
    );

    unmount();

    expect(unsubscribe).toBeCalledTimes(1);
  });

  it('returns the expected value of auth status on init when a user is not signed in', () => {
    const { queryByText } = render(
      <AuthenticatorProvider>
        <AuthStatusComponent />
      </AuthenticatorProvider>
    );

    expect(currentAuthenticatedUserSpy).toBeCalledTimes(2);
    expect(queryByText('configuring')).toBeDefined();
  });

  it('returns the expected value of auth status on init when a user is signed in', () => {
    currentAuthenticatedUserSpy.mockResolvedValueOnce({ username: 'username' });
    const { queryByText } = render(
      <AuthenticatorProvider>
        <AuthStatusComponent />
      </AuthenticatorProvider>
    );

    expect(queryByText('authenticated')).toBeDefined();
  });

  it('returns the expected value of auth status when a user signs out', () => {
    currentAuthenticatedUserSpy.mockResolvedValueOnce({ username: 'username' });
    const { queryByText } = render(
      <AuthenticatorProvider>
        <AuthStatusComponent />
      </AuthenticatorProvider>
    );

    expect(queryByText('authenticated')).toBeDefined();
  });
});
