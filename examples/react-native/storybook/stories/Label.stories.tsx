import React from 'react';
import { StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { Label } from '@aws-amplify/ui-react-native/dist/primitives';
import { Screen } from '../ui';

storiesOf('Label', module)
  .add('default Label', () => <Label>Default Label</Label>)
  .add('style', () => <Label style={styles.redText}>This should be red</Label>);

const styles = StyleSheet.create({
  redText: {
    color: 'red',
  },
});
