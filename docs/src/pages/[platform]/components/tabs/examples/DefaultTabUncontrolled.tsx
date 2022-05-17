import { Tabs, TabItem } from '@aws-amplify/ui-react';

export const DefaultTabUncontrolled = () => (
  <Tabs defaultIndex={1}>
    <TabItem title="First">Content of the first tab</TabItem>
    <TabItem title="Second">
      The content of the second tab is initially shown because we passed in
      index 1 to defaultIndex (notice that the tabs are zero-indexed).
    </TabItem>
  </Tabs>
);
