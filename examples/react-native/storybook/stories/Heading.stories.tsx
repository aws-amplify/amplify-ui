import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Heading } from '@aws-amplify/ui-react-native/dist/primitives';
import { Screen } from '../ui';
import { StyleSheet } from 'react-native';

storiesOf('Heading', module)
  .addDecorator((Story: any) => (
    <Screen>
      <Story />
    </Screen>
  ))
  .add('default', () => <Heading>Default Heading</Heading>)
  .add('level', () => (
    <>
      <Heading level={1}>Heading level 1</Heading>
      <Heading level={2}>Heading level 2</Heading>
      <Heading level={3}>Heading level 3</Heading>
      <Heading level={4}>Heading level 4</Heading>
      <Heading level={5}>Heading level 5</Heading>
      <Heading level={6}>Heading level 6</Heading>
      <Heading>Default heading (level 6)</Heading>
    </>
  ))
  .add('numberOfLines', () => (
    <>
      <Heading level={1} numberOfLines={1}>
        Really long heading that SHOULD be truncated with an ellipsis
      </Heading>
      <Heading level={1}>
        Really long heading that should NOT be truncated with an ellipsis
      </Heading>
    </>
  ))
  .add('style', () => (
    <Heading style={styles.redText}>This should be red</Heading>
  ));

const styles = StyleSheet.create({
  redText: {
    color: 'red',
  },
});
