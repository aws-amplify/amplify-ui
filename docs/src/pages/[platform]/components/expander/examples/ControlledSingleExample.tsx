import * as React from 'react';

import { Expander, ExpanderGroup } from '@aws-amplify/ui-react';

export const ControlledSingleExpander = () => {
  const [value, setValue] = React.useState<string | string[]>();
  return (
    <ExpanderGroup type="single" value={value} onValueChange={setValue}>
      <Expander title="What do you call a deer with no eyes?" value="joke-1">
        No eye-deer.
      </Expander>
      <Expander
        title="What do you call a deer with no eyes or legs?"
        value="joke-2"
      >
        Still, no eye-deer.
      </Expander>
    </ExpanderGroup>
  );
};
