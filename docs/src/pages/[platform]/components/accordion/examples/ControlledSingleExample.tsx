import * as React from 'react';

import { Accordion } from '@aws-amplify/ui-react';

export const ControlledSingleAccordion = () => {
  const [value, setValue] = React.useState<string[]>([]);
  return (
    <Accordion value={value} onChange={setValue}>
      <Accordion.Item
        title="What do you call a deer with no eyes?"
        value="joke-1"
      >
        No eye-deer.
      </Accordion.Item>
      <Accordion.Item
        title="What do you call a deer with no eyes or legs?"
        value="joke-2"
      >
        Still, no eye-deer.
      </Accordion.Item>
    </Accordion>
  );
};
