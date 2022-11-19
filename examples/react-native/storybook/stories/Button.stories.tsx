import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import { Button } from '@aws-amplify/ui-react-native/dist/primitives';

storiesOf('Button', module)
  .add('default', () => <Button>Default Button</Button>)
  .add('with text', () => (
    <Button onPress={action('clicked-text')}>
      <Text style={styles.whiteText}>Text Component</Text>
    </Button>
  ))
  .add('variants', () => (
    <>
      <Button variant="primary">Primary</Button>
      <Button variant="default">Default</Button>
      <Button variant="link">Link</Button>
    </>
  ))
  .add('with emoji', () => (
    <Button onPress={action('clicked-emoji')}>
      <Text>😀 😎 👍 💯</Text>
    </Button>
  ))
  .add('disabled', () => (
    <>
      <Button disabled variant="primary">
        Primary
      </Button>
      <Button disabled variant="default">
        Default
      </Button>
      <Button disabled variant="link">
        Link
      </Button>
    </>
  ))
  .add('styles', () => (
    <Button style={styles.container} textStyle={styles.whiteText}>
      White text, blue background
    </Button>
  ));

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
  },
  whiteText: {
    color: 'white',
    fontWeight: '900',
  },
});
