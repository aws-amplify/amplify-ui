import { Tabs, TabItem } from '@aws-amplify/ui-react';

export const OverrideStyleClasses = () => (
  <Tabs className="custom-tabs">
    <TabItem title="Tab 1" className="custom-tab-item">
      Content of Tab 1
    </TabItem>
    <TabItem title="Tab 2" className="custom-tab-item">
      Content of Tab 2
    </TabItem>
  </Tabs>
);
