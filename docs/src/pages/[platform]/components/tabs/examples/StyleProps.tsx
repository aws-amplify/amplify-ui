import { Tabs } from '@aws-amplify/ui-react';

export const StyleProps = () => {
  return (
    <Tabs.Container defaultValue="1">
      <Tabs.List backgroundColor="background.secondary">
        <Tabs.Item value="1" color="font.secondary">
          Tab 1
        </Tabs.Item>
        <Tabs.Item value="2" color="brand.secondary.60">
          Tab 2
        </Tabs.Item>
      </Tabs.List>
      <Tabs.Panel value="1">Content of Tab 1</Tabs.Panel>
      <Tabs.Panel value="2">Content of Tab 2</Tabs.Panel>
    </Tabs.Container>
  );
};
