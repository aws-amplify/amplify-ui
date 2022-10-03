import React from 'react';
// import { StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { RadioGroup } from '@aws-amplify/ui-react-native/dist/primitives';

storiesOf('RadioGroup', module).add('default', () => (
  <RadioGroup label="Default" value="default" />
));

// const styles = StyleSheet.create({
//   redText: {
//     color: 'red',
//   },
// });
