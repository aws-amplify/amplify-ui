import * as React from 'react';

import { Accordion } from '@aws-amplify/ui-react';

export const AlwaysOpenAccordionExample = () => {
  return (
    <Accordion isAlwaysOpen defaultValue={['item-1']}>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>
          Can I collapse this item?
          <Accordion.Icon />
        </Accordion.Trigger>
        <Accordion.Content>Only by opening the other item</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>
          What about the multiple Accordion?
          <Accordion.Icon />
        </Accordion.Trigger>
        <Accordion.Content>
          Yes, you can set the isAlwaysOpen prop along with allowMultiple
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};
