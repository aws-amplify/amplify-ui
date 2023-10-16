import * as React from 'react';
import { useRouter } from 'next/router';

import { Tabs, View } from '@aws-amplify/ui-react';

export const PageTabLayout = ({
  tabComponents,
}: {
  tabComponents: [{ title: string; children: React.Component }];
}) => {
  const {
    query: { tab, platform },
    pathname,
    push,
  } = useRouter();
  const tabComponentsMap = tabComponents.map(({ title }) =>
    title.toLocaleLowerCase()
  );

  const [currentTab, setCurrentTab] = React.useState(
    tab ? tab : tabComponentsMap[0]
  );
  const changeURL = (tab) => {
    push(
      {
        pathname,
        query: {
          platform,
          ...(tab !== tabComponentsMap[0] ? { tab: tab.toLowerCase() } : null),
        },
      },
      undefined,
      { shallow: true }
    );
    setCurrentTab(tab);
  };

  return (
    <Tabs value={currentTab as string} onChange={changeURL} isLazy>
      <Tabs.List>
        {tabComponents.map(({ title }, idx) => (
          <Tabs.Tab key={idx} value={title.toLocaleLowerCase()}>
            {title}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {tabComponents.map(({ title, children }, idx) => (
        <Tabs.Panel key={idx} value={title.toLocaleLowerCase()}>
          <View className="docs-page-tab">{children}</View>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};
