import { Tabs } from '@aws-amplify/ui-react';

export const DisabledTabs = () => (
  <Tabs.Container defaultValue="1">
    <Tabs.List>
      <Tabs.Item value="1">Tab 1</Tabs.Item>
      <Tabs.Item value="2">Tab 2</Tabs.Item>
      <Tabs.Item value="3" isDisabled>
        Tab 3
      </Tabs.Item>
    </Tabs.List>
    <Tabs.Panel value="1">Tab 1 Content</Tabs.Panel>
    <Tabs.Panel value="2">Tab 2 Content</Tabs.Panel>
    <Tabs.Panel value="3" isDisabled>
      This Tab is not clickable and will not display its content to the user.
    </Tabs.Panel>
  </Tabs.Container>
);
