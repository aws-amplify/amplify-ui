import * as React from 'react';

import { Expander, ExpanderItem } from '@aws-amplify/ui-react';

export const CollapsibleExpander = () => {
  return (
    <Expander type="single" isCollapsible={true}>
      <ExpanderItem title="Can I open and collapse this item?" value="item-1">
        Yes, because this Expander is the single type, and we have set the
        isCollapsible prop to true.
      </ExpanderItem>
      <ExpanderItem title="What about the multiple Expander?" value="item-2">
        The isCollapsible prop on the multiple Expander is set to true by
        default.
      </ExpanderItem>
    </Expander>
  );
};
