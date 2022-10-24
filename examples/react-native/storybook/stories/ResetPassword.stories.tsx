import React from 'react';
import { StyleSheet, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { ResetPassword } from '@aws-amplify/ui-react-native/dist/Authenticator/Defaults';

const props = {
  error: undefined,
  Footer: ResetPassword.Footer,
  FormFields: [] as any,
  Header: ResetPassword.Header,
  handleBlur: () => {},
  handleChange: () => {},
  handleSubmit: () => {},
  isPending: false,
  onBlur: undefined,
  onChangeText: undefined,
  onSubmit: undefined,
  toSignIn: () => {},
};

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
  .add('isPending', () => (
    <View style={styles.container}>
      <ResetPassword {...props} isPending />
    </View>
  ));

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
  },
});
