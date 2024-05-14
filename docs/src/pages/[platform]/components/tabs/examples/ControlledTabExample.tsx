import { useState } from 'react';
import { Tabs, Button } from '@aws-amplify/ui-react';

export const ControlledTabExample = () => {
  const [tab, setTab] = useState('1');
  return (
    <Tabs
      value={tab}
      onValueChange={(tab) => setTab(tab)}
      items={[
        {
          label: 'First',
          value: '1',
          content: 'Content of the first tab',
        },
        {
          label: 'Second',
          value: '2',
          content: (
            <>
              <p>Content of the second tab.</p>
              <Button isFullWidth onClick={() => setTab('1')}>
                Go to first tab
              </Button>
            </>
          ),
        },
      ]}
    />
  );
};
