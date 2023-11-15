import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import * as AuthModule from 'aws-amplify/auth';

import {
  AuthenticatorRoute,
  SocialProvider,
  authenticatorTextUtil,
  capitalize,
} from '@aws-amplify/ui';

import FederatedProviderButtons from '../FederatedProviderButtons';

const { getSignInWithFederationText } = authenticatorTextUtil;

const route: AuthenticatorRoute = 'signIn';
const provider = 'amazon';
const socialProviders: SocialProvider[] = [provider];
const toFederatedSignIn = jest.fn();
const defaultProps = {
  route,
  socialProviders,
  toFederatedSignIn,
};

describe('FederatedProviderButtons', () => {
  it('renders as expected', () => {
    const { getByText, toJSON } = render(
      <FederatedProviderButtons {...defaultProps} />
    );

    expect(
      getByText(getSignInWithFederationText(route, provider))
    ).toBeDefined();

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders nothing when socialProviders is empty', () => {
    const { toJSON } = render(
      <FederatedProviderButtons {...defaultProps} socialProviders={[]} />
    );

    expect(toJSON()).toBe(null);
  });

  it('calls signInWithRedirect with the expected provider on press', () => {
    const signInWithRedirectSpy = jest
      .spyOn(AuthModule, 'signInWithRedirect')
      .mockImplementation((_?: AuthModule.SignInWithRedirectInput) =>
        Promise.resolve(undefined)
      );

    const { getByText } = render(
      <FederatedProviderButtons {...defaultProps} />
    );

    const providerButton = getByText(
      getSignInWithFederationText(route, provider)
    );
    expect(providerButton).toBeDefined();

    fireEvent.press(providerButton);

    expect(signInWithRedirectSpy).toHaveBeenCalledWith({
      provider: capitalize(provider),
    });
  });
});
