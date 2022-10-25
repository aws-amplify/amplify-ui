import React, { useMemo } from 'react';
import { Text, View } from 'react-native';

import { icons } from '../../../assets';
import { capitalize } from '../../../utils';
import { FederatedProviderButton } from '../FederatedProviderButton';

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
      {/* TODO add divider line */}
      <Text style={styles.text}>Or</Text>
    </View>
  ) : null;
}
