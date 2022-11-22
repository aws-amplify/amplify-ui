import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { icons } from '../../../../assets';
import FederatedProviderButton from '../FederatedProviderButton';

const signInText = 'Sign In with Amazon';

/* TODO: Add more tests */
describe('FederatedProviderButton', () => {
  it('renders default button as expected', () => {
    const { toJSON } = render(
      <FederatedProviderButton source={icons.amazonLogo}>
        {signInText}
      </FederatedProviderButton>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('handles an onPress callback', () => {
    const toFederatedSignInMock = jest.fn();
    const { getByText } = render(
      <FederatedProviderButton
        source={icons.amazonLogo}
        onPress={toFederatedSignInMock}
      >
        {signInText}
      </FederatedProviderButton>
    );

    const button = getByText(signInText);
    fireEvent.press(button);

    expect(toFederatedSignInMock).toHaveBeenCalledTimes(1);
  });
});
