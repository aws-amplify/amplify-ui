import React from 'react';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import { SocialProvider } from '@aws-amplify/ui';
import { storiesOf } from '@storybook/react-native';
import { FederatedProviderButton } from '@aws-amplify/ui-react-native/dist/Authenticator/common';
import { icons } from '@aws-amplify/ui-react-native/dist/assets';
import { capitalize } from '@aws-amplify/ui-react-native/src/utils';

const providers: SocialProvider[] = ['amazon', 'apple', 'facebook', 'google'];

type Logos = {
  [key in SocialProvider]: ImageSourcePropType;
};

const logos: Logos = {
  amazon: icons.amazonLogo,
  apple: icons.appleLogo,
  facebook: icons.facebookLogo,
  google: icons.googleLogo,
};

storiesOf('FederatedProviderButton', module)
  .add('default', () => (
    <FederatedProviderButton source={logos.amazon}>
      Sign In with Amazon
    </FederatedProviderButton>
  ))
  .add('mock', () => (
    <View style={styles.container}>
      {providers.map((provider, index) => (
        <FederatedProviderButton
          key={`${provider}-${index}`}
          source={logos[provider]}
          style={styles.button}
        >
          Sign In with {capitalize(provider)}
        </FederatedProviderButton>
      ))}
    </View>
  ));

const styles = StyleSheet.create({
  container: {
    width: '90%',
  },
  button: {
    marginVertical: 8,
  },
});
