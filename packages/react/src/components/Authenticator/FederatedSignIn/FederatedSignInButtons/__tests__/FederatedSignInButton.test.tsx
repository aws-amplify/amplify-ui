import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { FederatedIdentityProviders } from '@aws-amplify/ui';
import * as ReactCoreModule from '@aws-amplify/ui-react-core';

import { FederatedSignInButton } from '../FederatedSignInButton';

const SUPPORTED_PROVIDERS = [
  FederatedIdentityProviders.Amazon,
  FederatedIdentityProviders.Apple,
  FederatedIdentityProviders.Facebook,
  FederatedIdentityProviders.Google,
];

const useAuthenticatorMock = {
  toFederatedSignIn: jest.fn(),
};

jest
  .spyOn(ReactCoreModule, 'useAuthenticator')
  .mockImplementation(() => useAuthenticatorMock as any);

describe('FederatedSignInButton', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  it.each(SUPPORTED_PROVIDERS)(
    'renders as expected with %s provider',
    (provider) => {
      const { container } = render(
        <FederatedSignInButton
          provider={provider}
          text={`Sign in with ${provider}`}
        />
      );
      expect(container).toMatchSnapshot();
    }
  );

  it('sends valid parameter to `toFederatedSignIn`', async () => {
    render(
      <FederatedSignInButton
        provider={FederatedIdentityProviders.Facebook}
        text="Sign In with Facebook"
      />
    );

    const button = await screen.findByRole('button');

    fireEvent.click(button);
    const { toFederatedSignIn } = useAuthenticatorMock;

    expect(toFederatedSignIn).toHaveBeenCalledTimes(1);
    expect(toFederatedSignIn).toHaveBeenCalledWith({
      provider: 'Facebook',
    });
  });
});
