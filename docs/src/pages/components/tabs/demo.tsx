import * as React from 'react';
import { Tabs, TabItem, TabsProps, Button, View } from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { TabsPropControls } from './TabsPropControls';
import { useTabsProps } from './useTabsProps';
import { demoState } from '@/utils/demoState';

const propsToCode = (props) => {
  return (
    `<Tabs` +
    `\n  currentIndex="${props.currentIndex}"` +
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
  </TabItem>,
  <TabItem title="Disabled" isDisabled={true}>
    Cannot click
  </TabItem>
</Tabs>`
  );
};

export const DemoTabPanel = ({ children }) => {
  return <View padding="var(--amplify-space-medium">{children}</View>;
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
  currentIndex: 0,
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
        currentIndex={tabsProps.currentIndex}
        onChange={(i) => tabsProps.setCurrentIndex(i)}
        spacing={tabsProps.spacing}
        justifyContent={tabsProps.justifyContent}
        indicatorPosition={tabsProps.indicatorPosition}
      >
        {tabsProps.children}
      </Tabs>
    </Demo>
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
