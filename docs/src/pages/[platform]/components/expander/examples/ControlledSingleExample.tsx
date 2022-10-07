import * as React from 'react';

import { Expander, ExpanderItem } from '@aws-amplify/ui-react';

export const ControlledSingleExpander = () => {
  const [value, setValue] = React.useState<string | string[]>();
  return (
    <Expander type="single" value={value} onValueChange={setValue}>
      <ExpanderItem
        title="What do you call a deer with no eyes?"
        value="joke-1"
      >
        No eye-deer.
      </ExpanderItem>
      <ExpanderItem
        title="What do you call a deer with no eyes or legs?"
        value="joke-2"
      >
        Still, no eye-deer.
      </ExpanderItem>
    </Expander>
  );
};
