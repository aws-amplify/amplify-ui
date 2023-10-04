import * as React from 'react';

import { Accordion } from '@aws-amplify/ui-react';

export const ControlledSingleAccordion = () => {
  const [value, setValue] = React.useState<string[]>([]);
  return (
    <Accordion value={value} onChange={setValue}>
      <Accordion.Item value="joke-1">
        <Accordion.Trigger>
          What do you call a deer with no eyes?
          <Accordion.Icon />
        </Accordion.Trigger>
        <Accordion.Content>No eye-deer.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="joke-2">
        <Accordion.Trigger>
          What do you call a deer with no eyes or legs?
          <Accordion.Icon />
        </Accordion.Trigger>
        <Accordion.Content>Still, no eye-deer.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};
