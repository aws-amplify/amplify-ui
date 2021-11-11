import * as React from 'react';

import { Expander, ExpanderItem, ExpanderProps } from '@aws-amplify/ui-react';

export const ControlledMultipleExpander = (props: ExpanderProps) => {
  const [value, setValue] = React.useState<string | string[]>();
  return (
    <Expander type="multiple" value={value} onChange={setValue} {...props}>
      <ExpanderItem title="Section 1 title" value="item-1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </ExpanderItem>
      <ExpanderItem title="Section 2 title" value="item-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </ExpanderItem>
      <ExpanderItem title="Section 3 title" value="item-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </ExpanderItem>
    </Expander>
  );
};
