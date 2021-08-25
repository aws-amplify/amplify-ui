import React from 'react';
import { Tabs, Tab } from '@aws-amplify/ui-react';
import { BadgeDemo } from '../badge/demo';

// import { BadgePropControls } from '@/components/BadgePropControls';
// import { useBadgeProps } from '@/components/useBadgeProps';
// import { Example } from '@/components/Example';

export const TabsDemo = () => {
  return (
    <Tabs ariaLabel="fruit tabs">
      <Tab title="Apples">Information about apples</Tab>
      <Tab title="Bananas">You should eat more bananas</Tab>
      <Tab title="Cherries">I love cherries!</Tab>
      <Tab title="Badge Demo">
        <BadgeDemo />
      </Tab>
    </Tabs>
  );
};
