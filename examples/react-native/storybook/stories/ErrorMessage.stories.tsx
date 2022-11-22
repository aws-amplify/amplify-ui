import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { ErrorMessage } from '@aws-amplify/ui-react-native/dist/primitives';

const OnDismissDemo = () => {
  const [dismissed, setDismissed] = useState(false);

  return (
    <View style={styles.dismissDemo}>
      {dismissed ? (
        <Text>ErrorMessage dismissed</Text>
      ) : (
        <ErrorMessage onDismiss={() => setDismissed(!dismissed)}>
          Press the close icon (x) to dismiss
        </ErrorMessage>
      )}
    </View>
  );
};

storiesOf('ErrorMessage', module)
  .add('default', () => <ErrorMessage>Default ErrorMessage</ErrorMessage>)
  .add('onDismiss', () => <OnDismissDemo />)
  .add('styles', () => (
    <ErrorMessage style={styles.alert} labelStyle={styles.whiteText}>
      White text, orange background
    </ErrorMessage>
  ))
  .add('long text', () => (
    <ErrorMessage>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </ErrorMessage>
  ));

const styles = StyleSheet.create({
  alert: {
    backgroundColor: '#ff7f50',
  },
  dismissDemo: {
    padding: 20,
  },
  whiteText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
