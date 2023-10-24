import { Tabs } from '@aws-amplify/ui-react';

export const DefaultTabUncontrolled = () => (
  <Tabs
    defaultValue={'Tab 1'}
    items={[
      { label: 'Tab 1', value: 'Tab 1', content: 'Tab content #1' },
      { label: 'Tab 2', value: 'Tab 2', content: 'Tab content #2' },
      { label: 'Tab 3', value: 'Tab 3', content: 'Tab content #3' },
    ]}
  />
);
