import * as React from 'react';
import { useRouter } from 'next/router';

import { Tabs, View } from '@aws-amplify/ui-react';

export const PageTabLayout = ({
  tabComponents,
}: {
  tabComponents: [{ title: string; children: React.ReactNode }];
}) => {
  const {
    query: { tab = '', platform },
    pathname,
    push,
  } = useRouter();
  const tabComponentsMap = tabComponents.map(({ title }) =>
    title.toLocaleLowerCase()
  );

  const getValue = React.useCallback(
    (tab: string) => (tab === '' ? tabComponentsMap[0] : tab),
    [tabComponentsMap]
  );
  const defaultValue = getValue(tab as string);

  const [currentTab, setCurrentTab] = React.useState(defaultValue);
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

  React.useEffect(() => {
    setCurrentTab(getValue(tab as string));
  }, [tab, getValue]);

  return (
    <Tabs.Container
      value={currentTab as string}
      onValueChange={changeURL}
      isLazy
    >
      <Tabs.List>
        {tabComponents.map(({ title }, idx) => (
          <Tabs.Item key={idx} value={title.toLocaleLowerCase()}>
            {title}
          </Tabs.Item>
        ))}
      </Tabs.List>
      {tabComponents.map(({ title, children }, idx) => (
        <Tabs.Panel key={idx} value={title.toLocaleLowerCase()}>
          <View className="docs-page-tab">{children}</View>
        </Tabs.Panel>
      ))}
    </Tabs.Container>
  );
};
