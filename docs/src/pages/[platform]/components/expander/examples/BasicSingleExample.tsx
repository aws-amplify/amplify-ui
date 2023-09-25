import * as React from 'react';

import { Expander, ExpanderGroup } from '@aws-amplify/ui-react';

export const BasicSingleExpander = () => {
  return (
    <ExpanderGroup type="single">
      <Expander title="Click me first!" value="item-1">
        Now when you click the second item, this item will automatically
        collapse.
      </Expander>
      <Expander title="Then click me!" value="item-2">
        Notice how only one item can be open at a time for the single Expander
        type.
      </Expander>
    </ExpanderGroup>
  );
};
