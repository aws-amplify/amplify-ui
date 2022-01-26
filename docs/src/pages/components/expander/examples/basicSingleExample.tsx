import * as React from 'react';

import { Expander, ExpanderItem } from '@aws-amplify/ui-react';

export const BasicSingleExpander = () => {
  return (
    <Expander type="single">
      <ExpanderItem title="Click me first!" value="item-1">
        Now when you click the second item, this item will automatically
        collapse.
      </ExpanderItem>
      <ExpanderItem title="Then click me!" value="item-2">
        Notice how only one item can be open at a time for the single Expander
        type.
      </ExpanderItem>
    </Expander>
  );
};
