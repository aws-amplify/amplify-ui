import React from 'react';
import { StyleProp, Text, TextStyle, ViewStyle } from 'react-native';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Button } from '@aws-amplify/ui-react-native/dist/primitives';
import { ThemeProvider } from '@aws-amplify/ui-react-native/dist/ThemeProvider';
import { Theme } from '@aws-amplify/ui-react-native/dist/theme';

const customTheme: Theme = {
  name: 'my-theme',
  tokens: {
    components: {
      button: {
        container: {
          borderColor: 'green',
        },
        text: {
          color: 'green',
        },
      },
    },
  },
};
const buttonStyleOverride: StyleProp<ViewStyle> = { borderColor: 'darkRed' };
const textStyleOverride: StyleProp<TextStyle> = { color: 'red' };

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
  .add('disabled', () => <Button disabled>Disabled Button</Button>)
  .add('style override', () => (
    <ThemeProvider>
      <Button style={buttonStyleOverride} textStyle={textStyleOverride}>
        Themed button
      </Button>
    </ThemeProvider>
  ))
  .add('default theme', () => (
    <ThemeProvider>
      <Button>Themed button</Button>
    </ThemeProvider>
  ))
  .add('custom theme', () => (
    <ThemeProvider theme={customTheme}>
      <Button>Themed button</Button>
    </ThemeProvider>
  ));
