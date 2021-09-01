import React from 'react';
import { Tabs, TabItem, Button } from '@aws-amplify/ui-react';

// import { BadgePropControls } from '@/components/BadgePropControls';
// import { useBadgeProps } from '@/components/useBadgeProps';
// import { Example } from '@/components/Example';

export const TabsDemo = () => {
  return (
    <Tabs
      ariaLabel="test tabs"
      className="danny"
      justifyContent="center"
      disabledTabs={[1]}
      // grow="relative"
    >
      <TabItem title="foo">
        <Button>Hello</Button>
      </TabItem>
      <TabItem title="bar">Yah</TabItem>
      <TabItem title="testing">123</TabItem>
      {/* <TabItem title={<Text color="red">Red Text</Text>}>Cool stuff</TabItem> */}
    </Tabs>
  );
};

// Show that another component can be passed to `title` as a way of styling (e.g., title={<Text color="red"><Red Text/Text>})
