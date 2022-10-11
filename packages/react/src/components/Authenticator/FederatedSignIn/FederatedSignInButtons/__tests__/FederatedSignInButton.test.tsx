import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { FederatedIdentityProviders } from '@aws-amplify/ui';
import * as ReactCoreModule from '@aws-amplify/ui-react-core';

import { FederatedSignInButton } from '../FederatedSignInButton';

interface SupportedProvider {
  provider: FederatedIdentityProviders;
  text: string;
}

const SUPPORTED_PROVIDERS_PROPS: SupportedProvider[] = [
  {
    provider: FederatedIdentityProviders.Amazon,
    text: 'Sign In with Amazon',
  },
  {
    provider: FederatedIdentityProviders.Apple,
    text: 'Sign In with Apple',
  },
  {
    provider: FederatedIdentityProviders.Facebook,
    text: 'Sign In with Facebook',
  },
  {
    provider: FederatedIdentityProviders.Google,
    text: 'Sign In with Google',
  },
];

const toFederatedSignIn = jest.fn();

jest.spyOn(ReactCoreModule, 'useAuthenticator').mockReturnValue({
  toFederatedSignIn,
} as unknown as ReactCoreModule.UseAuthenticator);

describe('FederatedSignInButton', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  it.each(SUPPORTED_PROVIDERS_PROPS)(
    'renders as expected with %s provider',
    (providerProps) => {
      const { container } = render(
        <FederatedSignInButton {...providerProps} />
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

    expect(toFederatedSignIn).toHaveBeenCalledTimes(1);
    expect(toFederatedSignIn).toHaveBeenCalledWith({
      provider: 'Facebook',
    });
  });
});
