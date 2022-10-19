import React from 'react';
import { StyleSheet, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import {
  FederatedProviderButton,
  Icon,
} from '@aws-amplify/ui-react-native/dist/primitives';
import { icons } from '@aws-amplify/ui-react-native/dist/assets';

{
  /* <Icon color={color} size={size} source={source} style={iconStyle} />; */
}

const AmazonIcon = <Icon source={icons.close} size={20} />;
const AppleIcon = <Icon source={icons.error} size={20} />;
const FacebookIcon = <Icon source={icons.visibilityOn} size={20} />;
const GoogleIcon = <Icon source={icons.checkboxFilled} size={20} />;

storiesOf('FederatedProviderButton', module)
  .add('default', () => (
    <FederatedProviderButton Icon={AmazonIcon}>
      Sign In with Amazon
    </FederatedProviderButton>
  ))
  .add('mock', () => (
    <View style={styles.container}>
      <FederatedProviderButton Icon={AmazonIcon} style={styles.button}>
        Sign In with Amazon
      </FederatedProviderButton>
      <FederatedProviderButton Icon={AppleIcon} style={styles.button}>
        Sign In with Apple
      </FederatedProviderButton>
      <FederatedProviderButton Icon={FacebookIcon} style={styles.button}>
        Sign In with Facebook
      </FederatedProviderButton>
      <FederatedProviderButton Icon={GoogleIcon} style={styles.button}>
        Sign In with Google
      </FederatedProviderButton>
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
