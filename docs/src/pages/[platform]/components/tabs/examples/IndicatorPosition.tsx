import { Tabs } from '@aws-amplify/ui-react';

export const IndicatorPosition = () => (
  <Tabs.Container>
    <Tabs.List indicatorPosition="top">
      <Tabs.Tab value="1">Tab 1</Tabs.Tab>
      <Tabs.Tab value="2">Tab 2</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="1">Tab 1 content</Tabs.Panel>
    <Tabs.Panel value="2">Tab 2 content</Tabs.Panel>
  </Tabs.Container>
);
