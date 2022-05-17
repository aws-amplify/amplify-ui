import { useState } from 'react';
import { Tabs, TabItem, Button } from '@aws-amplify/ui-react';

export const ControlledTabExample = () => {
  const [index, setIndex] = useState(0);
  return (
    <Tabs currentIndex={index} onChange={(i: number) => setIndex(i)}>
      <TabItem title="First">Content of the first tab</TabItem>
      <TabItem title="Second">
        <p>
          The content of the second tab is initially shown because we passed in
          index 1 to defaultIndex (notice that the tabs are zero-indexed).
        </p>
        <Button isFullWidth onClick={() => setIndex(0)}>
          Go to first tab
        </Button>
      </TabItem>
    </Tabs>
  );
};
