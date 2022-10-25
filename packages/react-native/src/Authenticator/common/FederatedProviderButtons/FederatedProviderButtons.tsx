import React, { useMemo } from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';

import { AuthenticatorMachineContext } from '@aws-amplify/ui-react-core';

import { FederatedProviderButton } from '../FederatedProviderButton';

import { icons } from '../../../assets';
import { capitalize } from '../../../utils';

// TODO extend from ViewProps, add button style related style props
interface FederatedProviderButtonsProps
  extends Pick<
    AuthenticatorMachineContext,
    'socialProviders' | 'toFederatedSignIn'
  > {}

interface FederatedProviderButtonStyle {
  button: ViewStyle;
  container: ViewStyle;
  text: TextStyle;
}

const styles: FederatedProviderButtonStyle = {
  button: { marginVertical: 8 },
  container: { paddingVertical: 4 },
  text: { paddingVertical: 8, textAlign: 'center' },
};

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
