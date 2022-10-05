import React from 'react';
// import { StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { ErrorMessage } from '@aws-amplify/ui-react-native/dist/primitives';

storiesOf('ErrorMessage', module).add('default', () => (
  <ErrorMessage>Default ErrorMessage</ErrorMessage>
));
// .add('style', () => <ErrorMessage style={styles.redText}>This should be red</ErrorMessage>);

// const styles = StyleSheet.create({
//   redText: {
//     color: 'red',
//   },
// });
