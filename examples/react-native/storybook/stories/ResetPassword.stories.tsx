import React from 'react';
import { StyleSheet, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { ResetPassword } from '@aws-amplify/ui-react-native/dist/Authenticator/Defaults';

const props = { Header: () => null, Footer: () => null } as any;

storiesOf('ResetPassword', module)
  .add('default', () => (
    <View style={styles.container}>
      <ResetPassword {...props} />
    </View>
  ))
  .add('error', () => (
    <View style={styles.container}>
      <ResetPassword {...props} error="There was an error." />
    </View>
  ))
  .add('header', () => <ResetPassword.Header />)
  .add('footer', () => <ResetPassword.Footer />)
  .add('formFields', () => <ResetPassword.FormFields {...props} />);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
  },
});
