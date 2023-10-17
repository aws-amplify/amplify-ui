import { useState } from 'react';
import { Tabs, Button } from '@aws-amplify/ui-react';

export const ControlledTabExample = () => {
  const [tab, setTab] = useState('1');
  return (
    <Tabs.Container value={tab} onValueChange={(tab) => setTab(tab)}>
      <Tabs.List>
        <Tabs.Tab value="1">First</Tabs.Tab>
        <Tabs.Tab value="2">Second</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="1">Content of the first tab</Tabs.Panel>
      <Tabs.Panel value="2">
        <p>
          The content of the second tab is initially shown because we passed in
          index 1 to defaultIndex (notice that the tabs are zero-indexed).
        </p>
        <Button isFullWidth onClick={() => setTab('1')}>
          Go to first tab
        </Button>
      </Tabs.Panel>
    </Tabs.Container>
  );
};
