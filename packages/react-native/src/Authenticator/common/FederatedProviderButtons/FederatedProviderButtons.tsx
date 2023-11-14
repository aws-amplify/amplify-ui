import React, { useMemo } from 'react';
import { View } from 'react-native';
import { signInWithRedirect } from 'aws-amplify/auth';

import {
  SocialProvider,
  authenticatorTextUtil,
  capitalize,
} from '@aws-amplify/ui';

import { Divider } from '../../../primitives';
import { useTheme } from '../../../theme';
import { FederatedProviderButton } from '../FederatedProviderButton';
import { FederatedProviderButtonsProps } from './types';
import { icons } from '../../../assets';
import { getThemedStyles } from './styles';

const { getSignInWithFederationText, getOrText } = authenticatorTextUtil;

// use `signInWithRedirect` directly instead of `toFederatedSignIn`
// exposed on `useAuthenticator` for RN. `@aws-amplify/rtn-web-browser`
// does not emit an event on federated sign in flow cancellation,
// preventing the `Authenticator` from updating state and leaving the
// UI in a "pending" state
const handleSignInWithRedirect = (
  provider: 'amazon' | 'apple' | 'facebook' | 'google'
) => signInWithRedirect({ provider: capitalize(provider) });

export default function FederatedProviderButtons({
  buttonStyle,
  dividerLabelStyle,
  route,
  socialProviders,
  style,
}: FederatedProviderButtonsProps): JSX.Element | null {
  const theme = useTheme();
  const themedStyle = getThemedStyles(theme);

  const providerButtons = useMemo(
    () =>
      socialProviders?.map((provider: SocialProvider) => {
        const providerIconSource = icons[`${provider}Logo`];

        const handlePress = () => {
          handleSignInWithRedirect(provider);
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
    [route, socialProviders, themedStyle, buttonStyle]
  );

  return providerButtons?.length ? (
    <View
      style={[themedStyle.container, style]}
      testID="amplify__federated-provider-buttons"
    >
      {providerButtons}
      <Divider labelStyle={[themedStyle.dividerLabel, dividerLabelStyle]}>
        {getOrText()}
      </Divider>
    </View>
  ) : null;
}
