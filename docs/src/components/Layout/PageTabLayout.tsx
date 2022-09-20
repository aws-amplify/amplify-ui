import * as React from 'react';
import { useRouter } from 'next/router';

import { Tabs, TabItem, View } from '@aws-amplify/ui-react';

export const PageTabLayout = ({ tabComponents }) => {
  const {
    query: { tab = '', platform },
    pathname,
    push,
  } = useRouter();

  const defaultIndex = tab === 'props' ? 1 : 0;
  const [tabIndex, setTabIndex] = React.useState(defaultIndex);

  const changeURL = (index) => {
    push(
      {
        pathname: index == 0 ? pathname.replace('/[tab]', '') : pathname,
        query: {
          platform,
          ...(index != 0 && { tab: tabComponents[index].title.toLowerCase() }),
        },
      },
      undefined,
      { shallow: true }
    );
    setTabIndex(index);
  };

  return (
    <Tabs
      currentIndex={tabIndex}
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
