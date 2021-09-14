import React from 'react';
import { Tabs, TabItem, Flex, Button, Text } from '@aws-amplify/ui-react';
import { TabsPropControls } from '@/components/TabsPropControls';
import { useTabsProps } from '@/components/useTabsProps';
import { Example } from '@/components/Example';

const demoChildren = [
  <TabItem title="Tab 1">Tab content #1</TabItem>,
  <TabItem title="Tab 2">Tab content #2</TabItem>,
  <TabItem title="Disabled" isDisabled={true}>
    Cannot click
  </TabItem>,
];

export const TabsDemo = () => {
  const tabsProps = useTabsProps({
    currentIndex: 0,
    justifyContent: 'flex-start',
    children: demoChildren,
  });

  return (
    <Flex direction="column" gap="0.5rem">
      <TabsPropControls {...tabsProps} />
      <Example>
        <Tabs
          currentIndex={tabsProps.currentIndex}
          onChange={(i) => tabsProps.setCurrentIndex(i)}
          grow={tabsProps.grow}
          justifyContent={tabsProps.justifyContent}
          indicatorPosition={tabsProps.indicatorPosition}
        >
          {tabsProps.children}
        </Tabs>
      </Example>
    </Flex>
  );
};

export const ControlledTabExample = () => {
  const [index, setIndex] = React.useState(0);
  return (
    <Tabs currentIndex={index} onChange={(i) => setIndex(i)}>
      <TabItem title="First">Content of the first tab</TabItem>
      <TabItem title="Second">
        The content of the second tab is initially shown because we passed in
        index 1 to defaultIndex (notice that the tabs are zero-indexed).
        <Button onClick={() => setIndex(0)}>Go to first tab</Button>
      </TabItem>
    </Tabs>
  );
};
