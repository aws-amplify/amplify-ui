import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { Tab, Tabs } from '@aws-amplify/ui-react-native/dist/primitives';
import { Text } from 'react-native';

const ControlledTabs = () => {
  const [index, setIndex] = useState(0);
  const onChangeHandler = (nextIndex: number) => {
    setIndex(nextIndex);
  };

  return (
    <Tabs
      onChange={onChangeHandler}
      selectedIndex={index}
      style={styles.container}
    >
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
  .add('default', () => (
    <Tabs>
      <Tab title="Tab 1">
        <Text>Tab 1 content panel</Text>
      </Tab>
      <Tab title="Tab 2">
        <Text>Tab 2 content panel</Text>
      </Tab>
      <View>
        <Text>Bogus town</Text>
      </View>
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
  ))
  .add('styles', () => (
    <Tabs
      style={[styles.container, styles.styledContainer]}
      tabStyle={styles.tabStyle}
      textStyle={styles.textStyle}
    >
      <Tab title="Tab 1">
        <Text>Tab 1 content panel</Text>
      </Tab>
      <Tab title="Tab 2">
        <Text>Tab 2 content panel</Text>
      </Tab>
    </Tabs>
  ));

const styles = StyleSheet.create({
  container: { width: '90%' },
  styledContainer: {
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
  },
  tabStyle: {
    backgroundColor: 'lavender',
    borderTopColor: 'rebeccapurple',
  },
  textStyle: {
    color: 'gray',
    fontWeight: '500',
  },
});
