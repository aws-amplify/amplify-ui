import React from 'react';
import { Tabs, TabItem, Flex, Button, Text, View } from '@aws-amplify/ui-react';
import { TabsPropControls } from '@/components/TabsPropControls';
import { useTabsProps } from '@/components/useTabsProps';
import { Example } from '@/components/Example';

export const DemoTabPanel = ({ children }) => {
  return <View padding="var(--amplify-space-medium">{children}</View>;
};

const demoChildren = [
  <TabItem title="Tab 1">
    <DemoTabPanel>Tab content #1</DemoTabPanel>
  </TabItem>,
  <TabItem title="Tab 2">
    <DemoTabPanel>Tab content #2</DemoTabPanel>
  </TabItem>,
  <TabItem title="Disabled" isDisabled={true}>
    <DemoTabPanel>Cannot click</DemoTabPanel>
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
          spacing={tabsProps.spacing}
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
    <Tabs currentIndex={index} onChange={(i: number) => setIndex(i)}>
      <TabItem title="First">
        <DemoTabPanel>Content of the first tab</DemoTabPanel>
      </TabItem>
      <TabItem title="Second">
        <DemoTabPanel>
          The content of the second tab is initially shown because we passed in
          index 1 to defaultIndex (notice that the tabs are zero-indexed).
          <Button onClick={() => setIndex(0)}>Go to first tab</Button>
        </DemoTabPanel>
      </TabItem>
    </Tabs>
  );
};
