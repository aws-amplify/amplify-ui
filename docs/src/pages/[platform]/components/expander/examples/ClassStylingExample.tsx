import * as React from 'react';

import { Expander, ExpanderGroup } from '@aws-amplify/ui-react';

export const ClassStylingExpander = () => {
  return (
    <ExpanderGroup className="my-expander" type="single">
      <Expander title="Section 1 title" value="item-1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Expander>
      <Expander title="Section 2 title" value="item-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Expander>
      <Expander title="Section 3 title" value="item-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Expander>
    </ExpanderGroup>
  );
};
