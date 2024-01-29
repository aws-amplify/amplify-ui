import { Tabs } from '@aws-amplify/ui-react';

export const ComposedTabsExample = () => {
  return (
    <Tabs.Container defaultValue="Tab 1">
      <Tabs.List>
        <Tabs.Item value="Tab 1">Tab 1</Tabs.Item>
        <Tabs.Item value="Tab 2">Tab 2</Tabs.Item>
        <Tabs.Item value="Tab 3" isDisabled>
          Tab 3
        </Tabs.Item>
      </Tabs.List>
      <Tabs.Panel value="Tab 1">Tab 1 content</Tabs.Panel>
      <Tabs.Panel value="Tab 2">Tab 1 content</Tabs.Panel>
      <Tabs.Panel value="Tab 3" isDisabled>
        Tab 1 content
      </Tabs.Panel>
    </Tabs.Container>
  );
};
