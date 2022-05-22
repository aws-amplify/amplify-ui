import { Tabs, TabItem, Text } from '@aws-amplify/ui-react';

export const Title = () => (
  <Tabs>
    <TabItem title="This is the first title">Content of the first tab</TabItem>
    <TabItem
      title={
        <Text color="red" as="span">
          Custom Red Title
        </Text>
      }
    >
      Content of the second tab
    </TabItem>
  </Tabs>
);
