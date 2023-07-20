import React from 'react';
import { fireEvent, render, renderHook } from '@testing-library/react-native';

import {
  AuthenticatorRoute,
  SocialProvider,
  authenticatorTextUtil,
} from '@aws-amplify/ui';

import FederatedProviderButtons, {
  FEDERATED_PROVIDER_BUTTONS_TEST_ID,
} from '../FederatedProviderButtons';
import { getThemedStyles } from '../styles';
import { getThemedStyles as getThemedDividerStyles } from '../../../../primitives/Divider/styles';
import { getThemedStyles as getThemedLabelStyles } from '../../../../primitives/Label/styles';
import { useTheme } from '../../../../theme';

const { getSignInWithFederationText, getOrText } = authenticatorTextUtil;

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

    expect(toFederatedSignIn).toBeCalledWith({ provider });
  });

  it('applies theme and style props', () => {
    const customStyle = { padding: 10 };
    const customTextStyle = { color: 'red' };

    const { toJSON, getByRole, getByText, getByTestId } = render(
      <FederatedProviderButtons
        {...defaultProps}
        style={customStyle}
        textStyle={customTextStyle}
      />
    );

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current);
    const themedDividerStyle = getThemedDividerStyles(result.current);
    const themedlabelStyle = getThemedLabelStyles(result.current);

    expect(
      getByTestId(FEDERATED_PROVIDER_BUTTONS_TEST_ID).props.style
    ).toStrictEqual([themedStyle.container, customStyle]);

    const dividerText = getByText(getOrText());
    expect(dividerText.props.style).toStrictEqual([
      themedlabelStyle.text,
      themedlabelStyle.primary,
      [themedDividerStyle.label, [themedStyle.text, customTextStyle]],
    ]);

    const button = getByRole('button');
    expect(button.props.style).toStrictEqual(
      expect.arrayContaining([
        expect.arrayContaining([
          expect.arrayContaining([expect.objectContaining(themedStyle.button)]),
        ]),
      ])
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
