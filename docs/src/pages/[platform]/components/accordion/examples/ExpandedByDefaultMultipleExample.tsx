import * as React from 'react';

import { Accordion } from '@aws-amplify/ui-react';

export const ExpandedByDefaultMultipleAccordion = () => {
  return (
    <Accordion defaultValue={['line-1', 'line-2']}>
      <Accordion.Item value="line-1">
        <Accordion.Trigger>
          Line 1
          <Accordion.Icon />
        </Accordion.Trigger>
        <Accordion.Content>Haikus can be fun</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="line-2">
        <Accordion.Trigger>
          Line 2
          <Accordion.Icon />
        </Accordion.Trigger>
        <Accordion.Content>
          But sometimes they don&lsquo;t make sense...
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="line-3">
        <Accordion.Trigger>
          Line 3
          <Accordion.Icon />
        </Accordion.Trigger>
        <Accordion.Content>Refrigerator</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};
