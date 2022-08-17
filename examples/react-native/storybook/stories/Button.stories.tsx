import React from 'react';
import { Text } from 'react-native';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Button } from '@aws-amplify/ui-react-native/dist/primitives';

storiesOf('Button', module)
  .add('with text', () => (
    <Button onPress={action('clicked-text')}>
      <Text>{text('Button text', 'Hello Button')}</Text>
    </Button>
  ))
  .add('with emoji', () => (
    <Button onPress={action('clicked-emoji')}>
      <Text>😀 😎 👍 💯</Text>
    </Button>
  ))
  .add('disabled', () => <Button disabled>Disabled Button</Button>);
