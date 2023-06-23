import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { authenticatorTextUtil } from '@aws-amplify/ui';
import { useAuthenticator } from '@aws-amplify/ui-react-core';

import FederatedProviderButtons from '../FederatedProviderButtons';

const { getSignInWithFederationText } = authenticatorTextUtil;

jest.mock('@aws-amplify/ui-react-core', () => ({
  useAuthenticator: jest.fn(),
}));

const route = 'signIn';
const toFederatedSignIn = jest.fn();
const mockUseAuthenticator = useAuthenticator as jest.Mock;

describe('FederatedProviderButtons', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders as expected', () => {
    mockUseAuthenticator.mockReturnValue({
      route: route,
      socialProviders: ['amazon'],
      toFederatedSignIn,
    });
    const { getByText, toJSON } = render(<FederatedProviderButtons />);

    expect(
      getByText(getSignInWithFederationText(route, 'amazon'))
    ).toBeDefined();

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders null when socialProviders is empty', () => {
    mockUseAuthenticator.mockReturnValue({
      route: route,
      socialProviders: [],
      toFederatedSignIn,
    });
    const { toJSON } = render(<FederatedProviderButtons />);

    expect(toJSON()).toBe(null);
  });

  it('calls toFederatedSignIn with the expected provider on press', () => {
    const provider = 'amazon';
    mockUseAuthenticator.mockReturnValue({
      route: route,
      socialProviders: [provider],
      toFederatedSignIn,
    });

    const { getByText } = render(<FederatedProviderButtons />);

    const providerButton = getByText(
      getSignInWithFederationText(route, 'amazon')
    );
    expect(providerButton).toBeDefined();

    fireEvent.press(providerButton);

    expect(toFederatedSignIn).toBeCalledWith({ provider });
  });
});
