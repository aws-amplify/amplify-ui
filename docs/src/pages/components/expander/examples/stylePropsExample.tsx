import * as React from 'react';

import { Expander, ExpanderItem, useTheme } from '@aws-amplify/ui-react';

export const StylePropsExpander = () => {
  const { tokens } = useTheme();

  return (
    <Expander
      type="single"
      style={{
        backgroundColor: `${tokens.colors.brand.secondary[80]}`,
        color: `${tokens.colors.white}`,
      }}
    >
      <ExpanderItem
        title="Section 1 title"
        value="item-1"
        backgroundColor="blue"
      >
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
