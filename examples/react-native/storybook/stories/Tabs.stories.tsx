import React, { useState } from 'react';
// import { StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { Tab, Tabs } from '@aws-amplify/ui-react-native/dist/primitives';
import { Text } from 'react-native';

const ControlledTabs = () => {
  const [index, setIndex] = useState(0);
  const onChange = (nextIndex: number) => {
    setIndex(nextIndex);
  };

  return (
    <Tabs onChange={onChange} selectedIndex={index}>
      <Tab title="One">
        <Text>Option 1 content</Text>
      </Tab>
      <Tab title="Two">
        <Text>Option 2 content</Text>
      </Tab>
    </Tabs>
  );
};

storiesOf('Tabs', module).add('default Tabs', () => <ControlledTabs />);
// .add('style', () => <Tabs style={styles.redText}>This should be red</Tabs>);

// const styles = StyleSheet.create({
//   redText: {
//     color: 'red',
//   },
// });
