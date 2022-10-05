import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { ErrorMessage } from '@aws-amplify/ui-react-native/dist/primitives';

const OnDismissDemo = () => {
  const [dismissed, setDismissed] = useState<boolean>(false);

  return (
    <>
      <ErrorMessage onDismiss={() => setDismissed(!dismissed)}>
        Press the close icon (x) to dismiss
      </ErrorMessage>
      {dismissed ? <Text>ErrorMessage dismissed</Text> : null}
    </>
  );
};

storiesOf('ErrorMessage', module)
  .add('default', () => <ErrorMessage>Default ErrorMessage</ErrorMessage>)
  .add('onDismiss', () => <OnDismissDemo />)
  .add('styles', () => (
    <ErrorMessage style={styles.alert} textStyle={styles.whiteText}>
      White text, orange background
    </ErrorMessage>
  ))
  .add('long text', () => (
    <ErrorMessage>
      This is a long string of text in order to test how the ErrorMessage
      container responds
    </ErrorMessage>
  ));

const styles = StyleSheet.create({
  alert: {
    backgroundColor: '#ff7f50',
  },
  whiteText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
