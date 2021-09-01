import React from 'react';
import { Tabs, TabItem, Flex, Button, Text } from '@aws-amplify/ui-react';
import { TabsPropControls } from '@/components/TabsPropControls';
import { useTabsProps } from '@/components/useTabsProps';
import { Example } from '@/components/Example';

const demoChildren = [
  <TabItem title="Greeting">
    <Button>Hello</Button>
  </TabItem>,
  <TabItem title="Foo">Bar</TabItem>,
  <TabItem title="Disabled for demonstration" isDisabled={true}>
    Cannot click
  </TabItem>,
];

export const TabsDemo = () => {
  const tabsProps = useTabsProps({
    defaultTab: 0,
    grow: '',
    justifyContent: 'flex-start',
    children: demoChildren.map((child) => child),
  });

  return (
    <Flex direction="column" gap="0.5rem">
      <TabsPropControls {...tabsProps} />
      <Example>
        <Tabs
          defaultTab={tabsProps.defaultTab}
          grow={tabsProps.grow}
          justifyContent={tabsProps.justifyContent}
        >
          {tabsProps.children}
        </Tabs>
      </Example>
    </Flex>
  );
};

// Show that another component can be passed to `title` as a way of styling (e.g., title={<Text color="red"><Red Text/Text>})
