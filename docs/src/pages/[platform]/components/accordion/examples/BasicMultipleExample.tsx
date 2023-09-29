import * as React from 'react';

import { Accordion } from '@aws-amplify/ui-react';

export const BasicMultipleAccordion = () => {
  return (
    <Accordion allowMultiple>
      <Accordion.Item title="Click me first!" value="item-1">
        Now when you click the second item, this item will stay open until you
        close it.
      </Accordion.Item>
      <Accordion.Item title="Then click me!" value="item-2">
        Notice how both items can be open at the same time for the multiple
        Accordion.
      </Accordion.Item>
    </Accordion>
  );
};
