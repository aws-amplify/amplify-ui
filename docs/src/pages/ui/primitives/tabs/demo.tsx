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
    defaultIndex: 0,
    justifyContent: 'flex-start',
    children: demoChildren,
  });

  return (
    <Flex direction="column" gap="0.5rem">
      <TabsPropControls {...tabsProps} />
      <Example>
        <Tabs
          defaultIndex={tabsProps.defaultIndex}
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

// Show that another component can be passed to `title` as a way of styling (e.g., title={<Text color="red"><Red Text/Text>})
