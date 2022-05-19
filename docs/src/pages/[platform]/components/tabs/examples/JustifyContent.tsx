import { Flex, Tabs, TabItem } from '@aws-amplify/ui-react';

export const JustifyContent = () => (
  <Flex direction="column" gap="2rem">
    <Tabs justifyContent="center">
      <TabItem title="First">Tabs are centered</TabItem>
      <TabItem title="Second">Content of the second tab</TabItem>
      <TabItem title="Third">Content of the third tab</TabItem>
    </Tabs>

    <Tabs justifyContent="flex-end">
      <TabItem title="First">Tabs are stacked to the right</TabItem>
      <TabItem title="Second">Content of the second tab</TabItem>
      <TabItem title="Third">Content of the third tab</TabItem>
    </Tabs>
  </Flex>
);
