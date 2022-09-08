import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Label } from '@aws-amplify/ui-react-native/dist/primitives';
import { StyleSheet } from 'react-native';

storiesOf('Label', module)
  .add('default Label', () => <Label>Default Label</Label>)
  .add('style', () => <Label style={styles.redText}>This should be red</Label>);

const styles = StyleSheet.create({
  redText: {
    color: 'red',
  },
});
