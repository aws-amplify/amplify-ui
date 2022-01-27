import * as React from 'react';

import { Expander, ExpanderItem } from '@aws-amplify/ui-react';

export const DefaultExpanderExample = () => {
  return (
    <Expander>
      <ExpanderItem title="What is an ExpanderItem?" value="expander-item">
        An ExpanderItem contains all the parts of a collapsible section.
      </ExpanderItem>
      <ExpanderItem title="This is the item's title" value="unique-value">
        The `children` of the ExpanderItem are displayed here.
      </ExpanderItem>
    </Expander>
  );
};
