import * as React from 'react';

import { Accordion } from '@aws-amplify/ui-react';

export const BasicSingleAccordion = () => {
  return (
    <Accordion.Container>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>
          Click me first!
          <Accordion.Icon />
        </Accordion.Trigger>
        <Accordion.Content>
          Now when you click the second item, this item will automatically
          collapse.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>
          Then click me!
          <Accordion.Icon />
        </Accordion.Trigger>
        <Accordion.Content>
          Notice how only one item can be open at a time for the single
          Accordion type.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Container>
  );
};
