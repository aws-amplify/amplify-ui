import * as React from 'react';
import { useRouter } from 'next/router';

import { Tabs, View } from '@aws-amplify/ui-react';

export const PageTabLayout = ({
  tabComponents,
}: {
  tabComponents: { title: string; children: React.ReactNode }[];
}) => {
  const { query, pathname, push } = useRouter();

  const defaultValue = tabComponents[0]['title'].toLocaleLowerCase();

  const handleValueChange = (value: string) => {
    const { platform } = query;
    const tab = value !== defaultValue ? value.toLocaleLowerCase() : undefined;
    push({ pathname, query: { platform, tab } }, undefined, { shallow: true });
  };

  return (
    <Tabs.Container
      defaultValue={defaultValue}
      onValueChange={handleValueChange}
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
