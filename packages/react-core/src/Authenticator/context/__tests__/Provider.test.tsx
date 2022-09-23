import { render } from '@testing-library/react';
import * as React from 'react';
import { Hub } from 'aws-amplify';

import { AuthenticatorProvider } from '..';

const hubListenSpy = jest.spyOn(Hub, 'listen');

function TestComponent(): JSX.Element | null {
  return null;
}

describe('AuthenticatorProvider', () => {
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
});
