import { Flex, Tabs, TabItem } from '@aws-amplify/ui-react';

export const Spacing = () => (
  <Flex direction="column" gap="2rem">
    <Tabs spacing="equal">
      <TabItem title="First">Content of the first tab</TabItem>
      <TabItem title="This is the second tab">
        Content of the second tab
      </TabItem>
      <TabItem title="Really long title for demonstration">
        Content of the third tab
      </TabItem>
    </Tabs>
    <Tabs spacing="relative">
      <TabItem title="First">Content of the first tab</TabItem>
      <TabItem title="This is the second tab">
        Content of the second tab
      </TabItem>
      <TabItem title="Really long title for demonstration">
        Content of the third tab
      </TabItem>
    </Tabs>
  </Flex>
);
