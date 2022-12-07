import React from 'react';
import { fireEvent, render, renderHook } from '@testing-library/react-native';

import { icons } from '../../../../assets';
import FederatedProviderButton from '../FederatedProviderButton';
import { useTheme } from '../../../../theme';
import { getThemedStyles as getButtonThemedStyles } from '../../../../primitives/Button/styles';
import { styles } from '../styles';

const signInText = 'Sign In with Amazon';

describe('FederatedProviderButton', () => {
  it('renders default button as expected', () => {
    const { toJSON, getByRole } = render(
      <FederatedProviderButton source={icons.amazonLogo}>
        {signInText}
      </FederatedProviderButton>
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getByRole('button')).toBeDefined();
    const icon = getByRole('image');
    expect(icon).toBeDefined();
    expect(icon.props.source).toEqual(icons.amazonLogo);
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

  it('applies style props', () => {
    const customStyle = { backgroundColor: 'blue' };

    const { toJSON, getByRole } = render(
      <FederatedProviderButton source={icons.amazonLogo} style={customStyle}>
        {signInText}
      </FederatedProviderButton>
    );

    const { result } = renderHook(() => useTheme());
    const buttonThemedStyle = getButtonThemedStyles(result.current);
    expect(getByRole('button').props.style).toStrictEqual([
      { ...buttonThemedStyle.container, ...buttonThemedStyle.containerDefault },
      undefined, // button pressed styles
      [
        styles.container,
        undefined, // pressed style
        customStyle,
      ],
    ]);

    expect(toJSON()).toMatchSnapshot();
  });
});
