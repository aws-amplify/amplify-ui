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
      <Tab>Sign In</Tab>
      <Tab>Create Account</Tab>
    </ControlledTabs>
  ))
  .add('disabled', () => (
    <ControlledTabs>
      <Tab>Tab 1</Tab>
      <Tab disabled>Tab 2 (disabled)</Tab>
    </ControlledTabs>
  ))
  .add('multiple', () => (
    <ControlledTabs>
      <Tab>Tab 1</Tab>
      <Tab>Tab 2</Tab>
      <Tab>Tab 3</Tab>
    </ControlledTabs>
  ))
  .add('styles', () => (
    <ControlledTabs
      style={styles.styledContainer}
      tabStyle={styles.tabStyle}
      textStyle={styles.textStyle}
    >
      <Tab>Tab 1</Tab>
      <Tab>Tab 2</Tab>
      {/* Show custom styling for Tab 3 */}
      <Tab>Tab 3</Tab>
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
