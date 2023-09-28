import * as React from 'react';

import { Accordion } from '@aws-amplify/ui-react';

export const CollapsibleAccordion = () => {
  return (
    <Accordion isExclusive isCollapsible>
      <Accordion.Item title="Can I open and collapse this item?" value="item-1">
        Yes, because this Accordion is the single type, and we have set the
        isCollapsible prop to true.
      </Accordion.Item>
      <Accordion.Item title="What about the multiple Accordion?" value="item-2">
        The isCollapsible prop on the multiple Accordion is set to true by
        default.
      </Accordion.Item>
    </Accordion>
  );
};
