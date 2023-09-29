import * as React from 'react';

import { Accordion } from '@aws-amplify/ui-react';

export const CollapsibleAccordion = () => {
  return (
    <Accordion allowToggle>
      <Accordion.Item title="Can I open and collapse this item?" value="item-1">
        Yes, because this Accordion is the single type, and we have set the
        allowToggle prop to true.
      </Accordion.Item>
      <Accordion.Item title="What about the multiple Accordion?" value="item-2">
        Yes, you still need to set the allowToggle prop though.
      </Accordion.Item>
    </Accordion>
  );
};
