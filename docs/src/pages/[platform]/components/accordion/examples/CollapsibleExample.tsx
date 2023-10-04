import * as React from 'react';

import { Accordion } from '@aws-amplify/ui-react';

export const CollapsibleAccordion = () => {
  return (
    <Accordion allowToggle>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>
          Can I open and collapse this item?
          <Accordion.Icon />
        </Accordion.Trigger>
        <Accordion.Content>
          Yes, because this Accordion is the single type, and we have set the
          allowToggle prop to true.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>
          What about the multiple Accordion?
          <Accordion.Icon />
        </Accordion.Trigger>
        <Accordion.Content>
          Yes, you still need to set the allowToggle prop though.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};
