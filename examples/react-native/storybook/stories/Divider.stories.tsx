import React from 'react';
import { StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import { Divider } from '@aws-amplify/ui-react-native/dist/primitives';

storiesOf('Divider', module)
  .add('default', () => <Divider>Default Label</Divider>)
  .add('no label', () => <Divider />)
  .add('styles', () => (
    <Divider
      style={styles.container}
      labelStyle={styles.label}
      lineStyle={styles.line}
    >
      Styled label
    </Divider>
  ));

const styles = StyleSheet.create({
  container: {
    width: '75%',
  },
  label: {
    color: 'teal',
  },
  line: {
    backgroundColor: 'teal',
    height: 1,
  },
});
