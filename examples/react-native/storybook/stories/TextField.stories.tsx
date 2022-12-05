import React from 'react';
import { StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import { TextField } from '@aws-amplify/ui-react-native/dist/primitives';

const styles = StyleSheet.create({
  container: {
    width: '50%',
  },
  errorMessage: {
    color: 'red',
  },
});

storiesOf('TextField', module)
  .add('default', () => <TextField style={styles.container} />)

  .add('placeholder', () => (
    <TextField style={styles.container} placeholder="Test" />
  ))
  .add('with label', () => <TextField style={styles.container} label="Test" />)
  .add('password', () => (
    <TextField style={styles.container} label="Password" secureTextEntry />
  ))
  .add('phone', () => (
    <TextField
      style={styles.container}
      label="Phone"
      keyboardType="phone-pad"
    />
  ))
  .add('with error', () => (
    <TextField
      style={styles.container}
      label="Test"
      error={true}
      errorMessage="Error Message"
      errorMessageStyle={styles.errorMessage}
    />
  ))
  .add('disabled', () => (
    <TextField label="Disabled" style={styles.container} disabled />
  ));
