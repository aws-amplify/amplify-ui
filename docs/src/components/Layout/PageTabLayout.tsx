import * as React from 'react';
import { useRouter } from 'next/router';

import { Tabs, TabItem, View } from '@aws-amplify/ui-react';

export const PageTabLayout = ({
  tabComponents,
}: {
  tabComponents: [{ title: string; children: React.Component }];
}) => {
  const {
    query: { tab = '', platform },
    pathname,
    push,
  } = useRouter();
  const tabComponentsMap = tabComponents.map(({ title }) =>
    title.toLocaleLowerCase()
  );

  const getIndex = (tab: string) =>
    tab === '' ? 0 : tabComponentsMap.indexOf(tab);
  const defaultIndex = getIndex(tab as string);
  const [tabIndex, setTabIndex] = React.useState(defaultIndex);
  const changeURL = (index) => {
    push(
      {
        pathname,
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

  React.useEffect(() => {
    setTabIndex(getIndex(tab as string));
  }, [tab, getIndex]);

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
