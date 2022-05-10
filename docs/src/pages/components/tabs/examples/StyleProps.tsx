import { Tabs, TabItem } from '@aws-amplify/ui-react';

export const StyleProps = () => (
  <Tabs backgroundColor="var(--amplify-colors-background-primary)">
    <TabItem
      title="Tab 1"
      color="var(--amplify-colors-font-primary)"
      backgroundColor="transparent"
    >
      Content of Tab 1
    </TabItem>
    <TabItem
      title="Tab 2"
      color="var(--amplify-colors-font-primary)"
      backgroundColor="transparent"
    >
      Content of Tab 2
    </TabItem>
  </Tabs>
);
