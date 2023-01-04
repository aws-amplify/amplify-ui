import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import FederatedProviderButtons from '../FederatedProviderButtons';

const toFederatedSignIn = jest.fn();
const providerButtonText = 'Sign In with Amazon';

describe('FederatedProviderButtons', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders as expected', () => {
    const { getByText, toJSON } = render(
      <FederatedProviderButtons
        socialProviders={['amazon']}
        toFederatedSignIn={toFederatedSignIn}
      />
    );

    const providerButton = getByText(providerButtonText);
    expect(providerButton).toBeDefined();

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders null when socialProviders is empty', () => {
    const { toJSON } = render(
      <FederatedProviderButtons
        socialProviders={[]}
        toFederatedSignIn={toFederatedSignIn}
      />
    );

    expect(toJSON()).toBe(null);
  });

  it('calls toFederatedSignIn with the expected provider on press', () => {
    const provider = 'amazon';
    const { getByText } = render(
      <FederatedProviderButtons
        socialProviders={[provider]}
        toFederatedSignIn={toFederatedSignIn}
      />
    );

    const providerButton = getByText(providerButtonText);
    expect(providerButton).toBeDefined();

    fireEvent.press(providerButton);

    expect(toFederatedSignIn).toBeCalledWith({ provider });
  });
});
