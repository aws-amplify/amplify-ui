import React from 'react';
import { StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import { PasswordField } from '@aws-amplify/ui-react-native/dist/primitives';

const styles = StyleSheet.create({
  container: {
    width: '50%',
  },
});

storiesOf('PasswordField', module)
  .add('default', () => <PasswordField containerStyle={styles.container} />)
  .add('disabled', () => (
    <PasswordField containerStyle={styles.container} disabled />
  ));
