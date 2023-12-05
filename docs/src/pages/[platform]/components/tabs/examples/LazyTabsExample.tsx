import { Tabs } from '@aws-amplify/ui-react';

export const LazyTabsExample = () => {
  return (
    <Tabs
      defaultValue="1"
      items={[
        { label: 'Tab 1', value: '1', content: 'Tab 1 content' },
        { label: 'Tab 2', value: '2', content: 'Tab 2 content' },
        { label: 'Tab 3', value: '3', content: 'Tab 3 content' },
      ]}
      isLazy
    />
  );
};
