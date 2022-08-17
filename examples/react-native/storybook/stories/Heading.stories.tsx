import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Heading } from '@aws-amplify/ui-react-native/dist/primitives';
import { Screen } from '../ui';

storiesOf('Heading', module)
  .add('Heading Test', () => (
    <Screen>
      <Heading>This is a heading!</Heading>
    </Screen>
  ))
  .add('level prop', () => (
    <Screen>
      <Heading level={1}>This should be a large level 1 heading</Heading>
    </Screen>
  ))
  .add('isTruncated', () => (
    <Screen>
      <Heading level={1}>
        Really long heading that should be truncated with an ellipsis
      </Heading>
    </Screen>
  ));
