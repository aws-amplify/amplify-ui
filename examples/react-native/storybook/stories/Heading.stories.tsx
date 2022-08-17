import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Heading } from '@aws-amplify/ui-react-native/dist/primitives';
import { Screen } from '../ui';

storiesOf('Heading', module)
  .addDecorator((Story: any) => (
    <Screen>
      <Story />
    </Screen>
  ))
  .add('Heading Test', () => <Heading>This is a heading!</Heading>)
  .add('level prop', () => (
    <Heading level={1}>This should be a large level 1 heading</Heading>
  ))
  .add('truncated', () => (
    <Heading level={1}>
      Really long heading that should be truncated with an ellipsis
    </Heading>
  ));
