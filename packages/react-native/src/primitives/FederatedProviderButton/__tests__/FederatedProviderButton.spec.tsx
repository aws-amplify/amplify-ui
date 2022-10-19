import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { icons } from '../../../assets';
import { Icon } from '../../Icon';
import FederatedProviderButton from '../FederatedProviderButton';

const AmazonIcon = <Icon source={icons.amazonLogo} size={20} />;
const signInText = 'Sign In with Amazon';

describe('FederatedProviderButton', () => {
  it('renders default button as expected', () => {
    const { toJSON } = render(
      <FederatedProviderButton Icon={AmazonIcon}>
        {signInText}
      </FederatedProviderButton>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('handles an onPress callback', () => {
    const toFederatedSignInMock = jest.fn();
    const { getByText } = render(
      <FederatedProviderButton
        Icon={AmazonIcon}
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
