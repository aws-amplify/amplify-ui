import { Tabs, TabItem } from '@aws-amplify/ui-react';

export const DataAttributeStyles = () => (
  <Tabs>
    <TabItem title="Tab 1">Content of Tab 1</TabItem>
    <TabItem title="Tab 2">Content of Tab 2</TabItem>
    <TabItem title="Tab 3" isDisabled={true}>
      Content of Tab 3
    </TabItem>
  </Tabs>
);
