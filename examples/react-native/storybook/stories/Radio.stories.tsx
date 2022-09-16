import React from 'react';
// import { StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { Radio } from '@aws-amplify/ui-react-native/dist/primitives';
import { Screen } from '../ui';

storiesOf('Radio', module)
  .addDecorator((Story: any) => (
    <Screen>
      <Story />
    </Screen>
  ))
  .add('default Radio', () => <Radio />);

// const styles = StyleSheet.create({
//   redText: {
//     color: 'red',
//   },
// });
