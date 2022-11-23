import React from 'react';
import { StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import { PasswordField } from '@aws-amplify/ui-react-native/dist/primitives';

const styles = StyleSheet.create({
  container: {
    width: '50%',
  },
  input: {
    color: 'red',
  },
  icon: {
    tintColor: 'red',
  },
});

storiesOf('PasswordField', module)
  .add('default', () => <PasswordField style={styles.container} />)
  .add('without password visibility icon', () => (
    <PasswordField style={styles.container} showPasswordButton={false} />
  ))
  .add('disabled', () => <PasswordField style={styles.container} disabled />)
  .add('style', () => (
    <PasswordField
      style={styles.container}
      fieldStyle={styles.input}
      iconStyle={styles.icon}
    >
      This should be red
    </PasswordField>
  ));
