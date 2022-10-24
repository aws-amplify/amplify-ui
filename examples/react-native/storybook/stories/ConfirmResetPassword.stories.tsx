import React from 'react';
import { StyleSheet, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { ConfirmResetPassword } from '@aws-amplify/ui-react-native/dist/Authenticator/Defaults';

const props = {} as any;

storiesOf('ConfirmResetPassword', module)
  .add('default', () => (
    <View style={styles.container}>
      <ConfirmResetPassword {...props} />
    </View>
  ))
  .add('header', () => <ConfirmResetPassword.Header />)
  .add('footer', () => <ConfirmResetPassword.Footer />)
  .add('formFields', () => <ConfirmResetPassword.FormFields {...props} />);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
  },
});
