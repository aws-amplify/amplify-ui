import * as React from 'react';
import { Tabs, TabItem, TabsProps } from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { TabsPropControls } from './TabsPropControls';
import { useTabsProps } from './useTabsProps';
import { demoState } from '@/utils/demoState';

const propsToCode = (props) => {
  return (
    `<Tabs` +
    `${props.spacing ? `\n  spacing="${props.spacing}"` : ``}` +
    `\n  justifyContent="${props.justifyContent}"` +
    `${
      props.indicatorPosition
        ? `\n  indicatorPosition="${props.indicatorPosition}"`
        : ``
    }` +
    `>
  <TabItem title="Tab 1">
    Tab content #1
  </TabItem>
  <TabItem title="Tab 2">
    Tab content #2
  </TabItem>
  <TabItem title="Disabled" isDisabled={true}>
    Cannot click
  </TabItem>
</Tabs>`
  );
};

const demoChildren = [
  <TabItem key={1} title="Tab 1">
    Tab content #1
  </TabItem>,
  <TabItem key={2} title="Tab 2">
    Tab content #2
  </TabItem>,
  <TabItem key={3} title="Disabled" isDisabled={true}>
    Cannot click
  </TabItem>,
];

const defaultTabsProps = {
  justifyContent: 'flex-start',
  children: demoChildren,
};

export const TabsDemo = () => {
  const tabsProps = useTabsProps(
    (demoState.get(Tabs.displayName) as TabsProps) || defaultTabsProps
  );

  return (
    <Demo
      code={propsToCode(tabsProps)}
      propControls={<TabsPropControls {...tabsProps} />}
    >
      <Tabs
        spacing={tabsProps.spacing}
        justifyContent={tabsProps.justifyContent}
        indicatorPosition={tabsProps.indicatorPosition}
      >
        {tabsProps.children}
      </Tabs>
    </Demo>
  );
};
