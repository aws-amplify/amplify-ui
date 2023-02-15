import React, { useMemo } from 'react';
import { View } from 'react-native';
import { capitalize } from '@aws-amplify/ui';

import { icons } from '../../../assets';
import { FederatedProviderButton } from '../FederatedProviderButton';
import { Divider } from '../../../primitives';

import { styles } from './styles';
import { FederatedProviderButtonsProps } from './types';

export default function FederatedProviderButtons({
  socialProviders,
  toFederatedSignIn,
}: FederatedProviderButtonsProps): JSX.Element | null {
  const providerButtons = useMemo(
    () =>
      socialProviders?.map((provider) => {
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
            {`Sign In with ${capitalize(provider)}`}
          </FederatedProviderButton>
        );
      }),
    [socialProviders, toFederatedSignIn]
  );

  return providerButtons?.length ? (
    <View style={styles.container}>
      {providerButtons}
      <Divider labelStyle={styles.text}>Or</Divider>
    </View>
  ) : null;
}
