import React from 'react';
// import { StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { Tabs } from '@aws-amplify/ui-react-native/dist/primitives';

storiesOf('Tabs', module).add('default Tabs', () => <Tabs>Default Tabs</Tabs>);
// .add('style', () => <Tabs style={styles.redText}>This should be red</Tabs>);

// const styles = StyleSheet.create({
//   redText: {
//     color: 'red',
//   },
// });
