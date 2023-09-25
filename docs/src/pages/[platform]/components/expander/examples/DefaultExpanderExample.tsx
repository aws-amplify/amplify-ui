import * as React from 'react';

import { Expander, ExpanderGroup } from '@aws-amplify/ui-react';

export const DefaultExpanderExample = () => {
  return (
    <ExpanderGroup>
      <Expander title="What is an Expander?" value="expander-item">
        An Expander contains all the parts of a collapsible section.
      </Expander>
      <Expander title="This is the item's title" value="unique-value">
        The `children` of the Expander are displayed here.
      </Expander>
    </ExpanderGroup>
  );
};
