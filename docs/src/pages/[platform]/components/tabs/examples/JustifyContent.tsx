import { Flex, Tabs } from '@aws-amplify/ui-react';

export const JustifyContent = () => (
  <Flex direction="column" gap="2rem">
    <Tabs.Container defaultValue="First">
      <Tabs.List justifyContent="center">
        <Tabs.Item value="First">First</Tabs.Item>
        <Tabs.Item value="Second">Second</Tabs.Item>
        <Tabs.Item value="Third">Third</Tabs.Item>
      </Tabs.List>
      <Tabs.Panel value="First">Tabs are centered</Tabs.Panel>
      <Tabs.Panel value="Second">Content of the second tab</Tabs.Panel>
      <Tabs.Panel value="Third">Content of the third tab</Tabs.Panel>
    </Tabs.Container>

    <Tabs.Container defaultValue="First">
      <Tabs.List justifyContent="flex-end">
        <Tabs.Item value="First">First</Tabs.Item>
        <Tabs.Item value="Second">Second</Tabs.Item>
        <Tabs.Item value="Third">Third</Tabs.Item>
      </Tabs.List>
      <Tabs.Panel value="First">Tabs are stacked to the right</Tabs.Panel>
      <Tabs.Panel value="Second">Content of the second tab</Tabs.Panel>
      <Tabs.Panel value="Third">Content of the third tab</Tabs.Panel>
    </Tabs.Container>
  </Flex>
);
