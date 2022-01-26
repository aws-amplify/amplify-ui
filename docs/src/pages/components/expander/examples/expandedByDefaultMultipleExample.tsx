import * as React from 'react';

import { Expander, ExpanderItem } from '@aws-amplify/ui-react';

export const ExpandedByDefaultMultipleExpander = () => {
  return (
    <Expander type="multiple" defaultValue={['line-1', 'line-2']}>
      <ExpanderItem title="Line 1" value="line-1">
        Haikus can be fun
      </ExpanderItem>
      <ExpanderItem title="Line 2" value="line-2">
        But sometimes they don&lsquo;t make sense...
      </ExpanderItem>
      <ExpanderItem title="Line 3" value="line-3">
        Refrigerator
      </ExpanderItem>
    </Expander>
  );
};
