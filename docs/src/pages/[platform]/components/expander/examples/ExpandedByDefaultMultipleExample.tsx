import * as React from 'react';

import { Expander, ExpanderGroup } from '@aws-amplify/ui-react';

export const ExpandedByDefaultMultipleExpander = () => {
  return (
    <ExpanderGroup type="multiple" defaultValue={['line-1', 'line-2']}>
      <Expander title="Line 1" value="line-1">
        Haikus can be fun
      </Expander>
      <Expander title="Line 2" value="line-2">
        But sometimes they don&lsquo;t make sense...
      </Expander>
      <Expander title="Line 3" value="line-3">
        Refrigerator
      </Expander>
    </ExpanderGroup>
  );
};
