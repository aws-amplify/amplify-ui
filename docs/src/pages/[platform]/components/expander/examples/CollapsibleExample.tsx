import * as React from 'react';

import { Expander, ExpanderGroup } from '@aws-amplify/ui-react';

export const CollapsibleExpander = () => {
  return (
    <ExpanderGroup type="single" isCollapsible={true}>
      <Expander title="Can I open and collapse this item?" value="item-1">
        Yes, because this Expander is the single type, and we have set the
        isCollapsible prop to true.
      </Expander>
      <Expander title="What about the multiple Expander?" value="item-2">
        The isCollapsible prop on the multiple Expander is set to true by
        default.
      </Expander>
    </ExpanderGroup>
  );
};
