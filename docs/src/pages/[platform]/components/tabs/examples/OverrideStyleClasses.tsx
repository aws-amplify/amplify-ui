import { Tabs } from '@aws-amplify/ui-react';

export const OverrideStyleClasses = () => (
  <Tabs.Container defaultValue="1">
    <Tabs.List className="custom-tabs">
      <Tabs.Item className="custom-tabs__item" value="1">
        Tab 1
      </Tabs.Item>
      <Tabs.Item className="custom-tabs__item" value="2">
        Tab 2
      </Tabs.Item>
    </Tabs.List>
    <Tabs.Panel value="1" className="custom-tab-item">
      Content of Tab 1
    </Tabs.Panel>
    <Tabs.Panel value="2" className="custom-tab-item">
      Content of Tab 2
    </Tabs.Panel>
  </Tabs.Container>
);
