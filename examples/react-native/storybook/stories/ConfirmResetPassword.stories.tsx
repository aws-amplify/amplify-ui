import React from 'react';
import { StyleSheet, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { ConfirmResetPassword } from '@aws-amplify/ui-react-native/dist/Authenticator/Defaults';

const props = {
  error: undefined,
  Footer: ConfirmResetPassword.Footer,
  FormFields: [] as any,
  Header: ConfirmResetPassword.Header,
  handleBlur: () => {},
  handleChange: () => {},
  handleSubmit: () => {},
  isPending: false,
  onBlur: undefined,
  onChangeText: undefined,
  onSubmit: undefined,
  resendCode: () => {},
};

storiesOf('ConfirmResetPassword', module)
  .add('default', () => (
    <View style={styles.container}>
      <ConfirmResetPassword {...props} />
    </View>
  ))
  .add('error', () => (
    <View style={styles.container}>
      <ConfirmResetPassword {...props} error="There was an error." />
    </View>
  ))
  .add('isPending', () => (
    <View style={styles.container}>
      <ConfirmResetPassword {...props} isPending />
    </View>
  ));

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
  },
});
