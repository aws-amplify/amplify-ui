import * as React from 'react';

import { Expander, ExpanderItem } from '@aws-amplify/ui-react';

export const DefaultExpanderExample = () => {
  return (
    <Expander>
      <ExpanderItem title="Section 1" value="item-1">
        Hello
      </ExpanderItem>
      <ExpanderItem title="Section 2" value="item-2">
        Goodbye
      </ExpanderItem>
    </Expander>
  );
};
