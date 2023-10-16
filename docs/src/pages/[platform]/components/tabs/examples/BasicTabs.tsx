import { Tabs } from '@aws-amplify/ui-react';

export const BasicTabs = () => (
  <Tabs.Container defaultValue="1">
    <Tabs.List>
      <Tabs.Tab value="1">Tab 1</Tabs.Tab>
      <Tabs.Tab value="2">Tab 2</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="1">Tab 1 Content</Tabs.Panel>
    <Tabs.Panel value="2">Tab 2 Content</Tabs.Panel>
  </Tabs.Container>
);
