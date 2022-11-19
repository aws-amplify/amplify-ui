import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
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
  .add('indicatorPosition', () => (
    <ControlledTabs indicatorPosition="top">
      <Tab>Tab 1</Tab>
      <Tab>Tab 2</Tab>
      <Tab>Tab 3</Tab>
    </ControlledTabs>
  ))
  .add('styles', () => (
    <ControlledTabs style={styles.styledContainer}>
      <Tab style={styles.tabStyle1} textStyle={styles.tabTextStyle1}>
        Tab 1
      </Tab>
      <Tab style={styles.tabStyle2} textStyle={styles.tabTextStyle2}>
        Tab 2
      </Tab>
    </ControlledTabs>
  ));

const styles = StyleSheet.create({
  container: { width: '90%' },
  styledContainer: {
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
  },
  tabStyle1: {
    backgroundColor: 'green',
    borderTopColor: 'yellow',
  },
  tabStyle2: {
    backgroundColor: 'lavender',
    borderTopColor: 'rebeccapurple',
  },
  tabTextStyle1: {
    color: 'yellow',
    fontWeight: '900',
  },
  tabTextStyle2: {
    color: 'gray',
    fontWeight: '500',
  },
});
