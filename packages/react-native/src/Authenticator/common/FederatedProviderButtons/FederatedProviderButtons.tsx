import React, { useMemo } from 'react';
import { View } from 'react-native';

import { SocialProvider, authenticatorTextUtil } from '@aws-amplify/ui';

import { Divider } from '../../../primitives';
import { FederatedProviderButton } from '../FederatedProviderButton';
import { FederatedProviderButtonsProps } from './types';
import { icons } from '../../../assets';
import { styles } from './styles';

const { getSignInWithFederationText, getOrText } = authenticatorTextUtil;

export default function FederatedProviderButtons({
  route,
  socialProviders,
  toFederatedSignIn,
}: FederatedProviderButtonsProps): JSX.Element | null {
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
            style={styles.button}
          >
            {getSignInWithFederationText(route, provider)}
          </FederatedProviderButton>
        );
      }),
    [route, socialProviders, toFederatedSignIn]
  );

  return providerButtons?.length ? (
    <View style={styles.container} testID="amplify__federated-provider-buttons">
      {providerButtons}
      <Divider labelStyle={styles.text}>{getOrText()}</Divider>
    </View>
  ) : null;
}
