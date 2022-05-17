import { Tabs, TabItem } from '@aws-amplify/ui-react';

export const DisabledTabs = () => (
  <Tabs>
    <TabItem title="Tab 1">Tab 1 Content</TabItem>
    <TabItem title="Tab 2">Tab 2 Content</TabItem>
    <TabItem title="Tab 3" isDisabled={true}>
      This Tab is not clickable and will not display its content to the user.
    </TabItem>
  </Tabs>
);
