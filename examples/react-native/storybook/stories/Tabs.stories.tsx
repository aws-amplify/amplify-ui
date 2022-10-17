import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { Tab, Tabs } from '@aws-amplify/ui-react-native/dist/primitives';

const ControlledTabs = ({ ...props }: any) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(
    props.selectedIndex
  );
  const handleOnChange = (nextValue: number) => {
    setSelectedIndex(nextValue);
  };

  return (
    <Tabs
      {...props}
      selectedIndex={selectedIndex}
      onChange={handleOnChange}
      style={styles.container}
    >
      {props.children}
    </Tabs>
  );
};

storiesOf('Tabs', module)
  .add('default', () => (
    <ControlledTabs>
      <Tab title="Sign In">
        <Text>Sign in content</Text>
      </Tab>
      <Tab title="Create Account">
        <Text>Create account content</Text>
      </Tab>
    </ControlledTabs>
  ))
  .add('disabled', () => (
    <ControlledTabs>
      <Tab title="Tab 1">
        <Text>Tab 2 should not be selectable</Text>
      </Tab>
      <Tab title="Tab 2" disabled>
        <Text>This content should not be viewable</Text>
      </Tab>
    </ControlledTabs>
  ))
  .add('multiple', () => (
    <ControlledTabs>
      <Tab title="Tab 1">
        <Text>Tab 1 content</Text>
      </Tab>
      <Tab title="Tab 2">
        <Text>Tab 2 content</Text>
      </Tab>
      <Tab title="Tab 3">
        <Text>Tab 3 content</Text>
      </Tab>
    </ControlledTabs>
  ))
  .add('styles', () => (
    <ControlledTabs
      style={styles.styledContainer}
      tabStyle={styles.tabStyle}
      textStyle={styles.textStyle}
    >
      <Tab title="Tab 1">
        <Text>Tab 1 content panel</Text>
      </Tab>
      <Tab title="Tab 2">
        <Text>Tab 2 content panel</Text>
      </Tab>
    </ControlledTabs>
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
