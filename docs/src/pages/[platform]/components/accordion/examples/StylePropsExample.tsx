import * as React from 'react';

import { Accordion } from '@aws-amplify/ui-react';

export const StylePropsAccordion = () => {
  return (
    <Accordion backgroundColor="brand.secondary.80" color="font.inverse">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>
          Section 1 title
          <Accordion.Icon />
        </Accordion.Trigger>
        <Accordion.Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>
          Section 2 title
          <Accordion.Icon />
        </Accordion.Trigger>
        <Accordion.Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>
          Section 3 title
          <Accordion.Icon />
        </Accordion.Trigger>
        <Accordion.Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};
