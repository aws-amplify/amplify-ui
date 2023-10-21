import * as React from 'react';

import { Accordion } from '@aws-amplify/ui-react';

export const DefaultAccordionExample = () => {
  return (
    <Accordion.Container>
      <Accordion.Item value="Accordion-item">
        <Accordion.Trigger>
          What is an Accordion?
          <Accordion.Icon />
        </Accordion.Trigger>
        <Accordion.Content>
          An Accordion contains all the parts of a collapsible section.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="unique-value">
        <Accordion.Trigger>
          This is the item title
          <Accordion.Icon />
        </Accordion.Trigger>
        <Accordion.Content>
          The `children` of the Accordion are displayed here.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Container>
  );
};
