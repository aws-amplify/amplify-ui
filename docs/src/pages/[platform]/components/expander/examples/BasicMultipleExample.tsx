import * as React from 'react';

import { Expander, ExpanderGroup } from '@aws-amplify/ui-react';

export const BasicMultipleExpander = () => {
  return (
    <ExpanderGroup type="multiple">
      <Expander title="Click me first!" value="item-1">
        Now when you click the second item, this item will stay open until you
        close it.
      </Expander>
      <Expander title="Then click me!" value="item-2">
        Notice how both items can be open at the same time for the multiple
        Expander.
      </Expander>
    </ExpanderGroup>
  );
};
