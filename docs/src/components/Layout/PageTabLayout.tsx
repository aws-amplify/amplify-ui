import * as React from 'react';

import { Tabs, TabItem, View } from '@aws-amplify/ui-react';
import { useCustomRouter } from '@/components/useCustomRouter';

export const PageTabLayout = ({ tabComponents }) => {
  const {
    query: { tab, platform },
    pathname,
    push,
  } = useCustomRouter();
  const changeURL = (e) =>
    push(
      {
        pathname,
        query: {
          platform,
          tab: tabComponents[e].title.toLowerCase(),
        },
      },
      undefined,
      { shallow: true }
    );

  return (
    <Tabs
      defaultIndex={
        tabComponents.findIndex(({ title }) => title.toLowerCase() === tab) || 0
      }
      justifyContent="flex-start"
      onChange={changeURL}
    >
      {tabComponents.map(({ title, children }, idx) => (
        <TabItem key={idx} title={title}>
          <View className="docs-page-tab">{children}</View>
        </TabItem>
      ))}
    </Tabs>
  );
};
