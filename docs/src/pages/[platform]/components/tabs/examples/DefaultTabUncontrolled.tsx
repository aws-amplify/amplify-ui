import { Tabs } from '@aws-amplify/ui-react';

export const DefaultTabUncontrolled = () => (
  <Tabs.Container defaultValue="second">
    <Tabs.List>
      <Tabs.Tab value="first">First</Tabs.Tab>
      <Tabs.Tab value="second">Second</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="first">Content of the first tab</Tabs.Panel>
    <Tabs.Panel value="second">
      The content of the second tab is initially shown because we passed in the
      default value of this panel.
    </Tabs.Panel>
  </Tabs.Container>
);
