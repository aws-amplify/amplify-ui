import * as React from 'react';

import { Accordion } from '@aws-amplify/ui-react';

export const ExpandedByDefaultMultipleAccordion = () => {
  return (
    <Accordion defaultValue={['line-1', 'line-2']}>
      <Accordion.Item title="Line 1" value="line-1">
        Haikus can be fun
      </Accordion.Item>
      <Accordion.Item title="Line 2" value="line-2">
        But sometimes they don&lsquo;t make sense...
      </Accordion.Item>
      <Accordion.Item title="Line 3" value="line-3">
        Refrigerator
      </Accordion.Item>
    </Accordion>
  );
};
