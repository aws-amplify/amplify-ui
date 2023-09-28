import * as React from 'react';

import { Accordion } from '@aws-amplify/ui-react';

export const ClassStylingAccordion = () => {
  return (
    <Accordion className="my-accordion" isExclusive>
      <Accordion.Item title="Section 1 title" value="item-1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Accordion.Item>
      <Accordion.Item title="Section 2 title" value="item-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Accordion.Item>
      <Accordion.Item title="Section 3 title" value="item-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Accordion.Item>
    </Accordion>
  );
};
