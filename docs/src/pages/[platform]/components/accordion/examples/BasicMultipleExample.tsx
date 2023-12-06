import * as React from 'react';

import { Accordion } from '@aws-amplify/ui-react';

export const BasicMultipleAccordion = () => {
  return (
    <Accordion.Container allowMultiple>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>
          Click me first!
          <Accordion.Icon />
        </Accordion.Trigger>
        <Accordion.Content>
          Now when you click the second item, this item will stay open until you
          close it.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>
          Then click me!
          <Accordion.Icon />
        </Accordion.Trigger>
        <Accordion.Content>
          Notice how both items can be open at the same time for the multiple
          Accordion.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Container>
  );
};
