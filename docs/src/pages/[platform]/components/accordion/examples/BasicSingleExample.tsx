import * as React from 'react';

import { Accordion } from '@aws-amplify/ui-react';

export const BasicSingleAccordion = () => {
  return (
    <Accordion isExclusive>
      <Accordion.Item title="Click me first!" value="item-1">
        Now when you click the second item, this item will automatically
        collapse.
      </Accordion.Item>
      <Accordion.Item title="Then click me!" value="item-2">
        Notice how only one item can be open at a time for the single Accordion
        type.
      </Accordion.Item>
    </Accordion>
  );
};
