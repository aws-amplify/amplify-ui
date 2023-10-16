import { Flex, Tabs } from '@aws-amplify/ui-react';

export const JustifyContent = () => (
  <Flex direction="column" gap="2rem">
    <Tabs defaultValue="First" justifyContent="center">
      <Tabs.List>
        <Tabs.Tab value="First">First</Tabs.Tab>
        <Tabs.Tab value="Second">Second</Tabs.Tab>
        <Tabs.Tab value="Third">Third</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="First">Tabs are centered</Tabs.Panel>
      <Tabs.Panel value="Second">Content of the second tab</Tabs.Panel>
      <Tabs.Panel value="Third">Content of the third tab</Tabs.Panel>
    </Tabs>

    <Tabs defaultValue="First" justifyContent="flex-end">
      <Tabs.List>
        <Tabs.Tab value="First">First</Tabs.Tab>
        <Tabs.Tab value="Second">Second</Tabs.Tab>
        <Tabs.Tab value="Third">Third</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="First">Tabs are stacked to the right</Tabs.Panel>
      <Tabs.Panel value="Second">Content of the second tab</Tabs.Panel>
      <Tabs.Panel value="Third">Content of the third tab</Tabs.Panel>
    </Tabs>
  </Flex>
);
