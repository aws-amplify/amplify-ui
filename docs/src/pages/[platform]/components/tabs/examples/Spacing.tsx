import { Flex, Tabs } from '@aws-amplify/ui-react';

export const Spacing = () => (
  <Flex direction="column" gap="2rem">
    <Tabs.Container defaultValue="1">
      <Tabs.List spacing="equal">
        <Tabs.Item value="1">First</Tabs.Item>
        <Tabs.Item value="2">This is the second tab</Tabs.Item>
        <Tabs.Item value="3">Really long title for demonstration</Tabs.Item>
      </Tabs.List>
      <Tabs.Panel value="1">Content of the first tab</Tabs.Panel>
      <Tabs.Panel value="2">Content of the second tab</Tabs.Panel>
      <Tabs.Panel value="3">Content of the third tab</Tabs.Panel>
    </Tabs.Container>
    <Tabs.Container defaultValue="1">
      <Tabs.List spacing="relative">
        <Tabs.Item value="1">First</Tabs.Item>
        <Tabs.Item value="2">This is the second tab</Tabs.Item>
        <Tabs.Item value="3">Really long title for demonstration</Tabs.Item>
      </Tabs.List>
      <Tabs.Panel value="1">Content of the first tab</Tabs.Panel>
      <Tabs.Panel value="2">Content of the second tab</Tabs.Panel>
      <Tabs.Panel value="3">Content of the third tab</Tabs.Panel>
    </Tabs.Container>
  </Flex>
);
