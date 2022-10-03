import React from 'react';
// import { StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import {
  Radio,
  RadioGroup,
} from '@aws-amplify/ui-react-native/dist/primitives';

storiesOf('RadioGroup', module).add('default', () => (
  <RadioGroup label="Default" value="default">
    <Radio value="default" label="Option 1" />
    <Radio value="option2" label="Option 2" />
    <Radio value="option3" label="Option 3" />
  </RadioGroup>
));

// const styles = StyleSheet.create({
//   redText: {
//     color: 'red',
//   },
// });
