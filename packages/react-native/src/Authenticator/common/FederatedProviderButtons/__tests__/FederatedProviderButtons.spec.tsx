import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import type { AuthenticatorRoute, SocialProvider } from '@aws-amplify/ui';
import { authenticatorTextUtil, capitalize } from '@aws-amplify/ui';

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

  it('calls toFederatedSignIn with the expected provider on press', () => {
    const { getByText } = render(
      <FederatedProviderButtons {...defaultProps} />
    );

    const providerButton = getByText(
      getSignInWithFederationText(route, provider)
    );
    expect(providerButton).toBeDefined();

    fireEvent.press(providerButton);

    expect(toFederatedSignIn).toHaveBeenCalledWith({
      provider: capitalize(provider),
    });
  });
});
