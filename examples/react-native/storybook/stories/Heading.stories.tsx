import React from 'react';
import { Text } from 'react-native';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Heading } from '@aws-amplify/ui-react-native/dist/primitives';
import { Screen } from '../ui';

storiesOf('Heading', module)
  // .addDecorator((Story) => (
  //   <Screen>
  //     <Story />
  //   </Screen>
  // ))
  .add('Heading Test', () => (
    <Screen>
      <Heading>This is a heading!</Heading>
    </Screen>
  ))
  .add('level prop', () => (
    <Heading level={1}>This should be a large level 1 heading</Heading>
  ))
  .add('isTruncated', () => (
    <Heading level={1}>
      Really long heading that should be truncated with an ellipsis
    </Heading>
  ));
