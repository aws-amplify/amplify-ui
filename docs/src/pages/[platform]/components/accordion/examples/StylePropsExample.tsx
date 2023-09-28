import * as React from 'react';

import { Accordion, useTheme } from '@aws-amplify/ui-react';

export const StylePropsAccordion = () => {
  const { tokens } = useTheme();

  return (
    <Accordion
      isExclusive
      backgroundColor="brand.secondary.80"
      color="font.inverse"
    >
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
