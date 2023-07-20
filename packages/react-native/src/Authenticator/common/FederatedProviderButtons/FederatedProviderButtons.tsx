import React, { useMemo } from 'react';
import { View } from 'react-native';

import { SocialProvider, authenticatorTextUtil } from '@aws-amplify/ui';

import { Divider } from '../../../primitives';
import { FederatedProviderButton } from '../FederatedProviderButton';
import { FederatedProviderButtonsProps } from './types';
import { icons } from '../../../assets';
import { getThemedStyles } from './styles';
import { useTheme } from '../../../theme';

const { getSignInWithFederationText, getOrText } = authenticatorTextUtil;

export const FEDERATED_PROVIDER_BUTTONS_TEST_ID =
  'amplify__federated-provider-buttons';

export default function FederatedProviderButtons({
  buttonStyle,
  dividerStyle,
  route,
  socialProviders,
  style,
  textStyle,
  toFederatedSignIn,
}: FederatedProviderButtonsProps): JSX.Element | null {
  const theme = useTheme();
  const themedStyle = getThemedStyles(theme);

  const providerButtons = useMemo(
    () =>
      socialProviders?.map((provider: SocialProvider) => {
        const providerIconSource = icons[`${provider}Logo`];

        const handlePress = () => {
          toFederatedSignIn({ provider });
        };

        return (
          <FederatedProviderButton
            key={provider}
            onPress={handlePress}
            source={providerIconSource}
            style={[themedStyle.button, buttonStyle]}
          >
            {getSignInWithFederationText(route, provider)}
          </FederatedProviderButton>
        );
      }),
    [buttonStyle, route, socialProviders, themedStyle.button, toFederatedSignIn]
  );

  return providerButtons?.length ? (
    <View
      style={[themedStyle.container, style]}
      testID={FEDERATED_PROVIDER_BUTTONS_TEST_ID}
    >
      {providerButtons}
      <Divider
        labelStyle={[themedStyle.text, textStyle]}
        lineStyle={[themedStyle.divider, dividerStyle]}
      >
        {getOrText()}
      </Divider>
    </View>
  ) : null;
}
