import React from 'react';
import { Tabs, TabItem, Text } from '@aws-amplify/ui-react';

// import { BadgePropControls } from '@/components/BadgePropControls';
// import { useBadgeProps } from '@/components/useBadgeProps';
// import { Example } from '@/components/Example';

export const TabsDemo = () => {
  return (
    <Tabs ariaLabel="fruit tabs">
      <TabItem title="yay">Hello</TabItem>
      <TabItem title="boo">Yah</TabItem>
      <TabItem title={<Text color="red">Red Text</Text>}>Cool stuff</TabItem>
    </Tabs>
  );
};

// Show that another component can be passed to `title` as a way of styling (e.g., title={<Text color="red"><Red Text/Text>})
