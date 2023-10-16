import { Tabs } from '@aws-amplify/ui-react';

export const OverrideStyleClasses = () => (
  <Tabs.Container className="custom-tabs" defaultValue="1">
    <Tabs.List>
      <Tabs.Tab value="1">Tab 1</Tabs.Tab>
      <Tabs.Tab value="2">Tab 2</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="1" className="custom-tab-item">
      Content of Tab 1
    </Tabs.Panel>
    <Tabs.Panel value="2" className="custom-tab-item">
      Content of Tab 2
    </Tabs.Panel>
  </Tabs.Container>
);
