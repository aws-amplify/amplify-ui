import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { Tab, Tabs } from '@aws-amplify/ui-react-native/dist/primitives';
import { Text } from 'react-native';

const ControlledTabs = () => {
  const [index, setIndex] = useState(0);
  const onChange = (nextIndex: number) => {
    setIndex(nextIndex);
  };

  return (
    <Tabs onChange={onChange} selectedIndex={index} style={styles.container}>
      <Tab title="Sign In">
        <Text>Sign in content</Text>
      </Tab>
      <Tab title="Create Account">
        <Text>Create account content</Text>
      </Tab>
    </Tabs>
  );
};

storiesOf('Tabs', module)
  .add('default Tabs', () => (
    <Tabs>
      <Tab title="Tab 1">
        <Text>Tab 1 content panel</Text>
      </Tab>
      <Tab title="Tab 2">
        <Text>Tab 2 content panel</Text>
      </Tab>
    </Tabs>
  ))
  .add('controlled Tabs', () => <ControlledTabs />)
  .add('defaultIndex', () => (
    <Tabs defaultIndex={1}>
      <Tab title="Tab 1">
        <Text>Tab 1 should not be selected by default</Text>
      </Tab>
      <Tab title="Tab 2">
        <Text>Tab 2 should be selected by default</Text>
      </Tab>
    </Tabs>
  ))
  .add('disabled', () => (
    <Tabs>
      <Tab title="Tab 1">
        <Text>Tab 2 should not be selectable</Text>
      </Tab>
      <Tab title="Tab 2" disabled>
        <Text>This content should not be viewable</Text>
      </Tab>
    </Tabs>
  ))
  .add('multiple', () => (
    <Tabs>
      <Tab title="Tab 1">
        <Text>Tab 1 content</Text>
      </Tab>
      <Tab title="Tab 2">
        <Text>Tab 2 content</Text>
      </Tab>
      <Tab title="Tab 3">
        <Text>Tab 3 content</Text>
      </Tab>
    </Tabs>
  ));
// styles?

const styles = StyleSheet.create({
  container: { width: '90%' },
  // button: {
  //   backgroundColor: '#317d95',
  //   color: 'white',
  //   width: '80%',
  // },
});
