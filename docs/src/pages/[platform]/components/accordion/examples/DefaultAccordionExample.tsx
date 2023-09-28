import * as React from 'react';

import { Accordion } from '@aws-amplify/ui-react';

export const DefaultAccordionExample = () => {
  return (
    <Accordion>
      <Accordion.Item title="What is an Accordion?" value="Accordion-item">
        An Accordion contains all the parts of a collapsible section.
      </Accordion.Item>
      <Accordion.Item title="This is the item's title" value="unique-value">
        The `children` of the Accordion are displayed here.
      </Accordion.Item>
    </Accordion>
  );
};
