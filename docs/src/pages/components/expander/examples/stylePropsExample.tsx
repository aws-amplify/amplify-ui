import * as React from 'react';

import { Expander, ExpanderItem, ExpanderProps } from '@aws-amplify/ui-react';

export const StylePropsExpander = (props: ExpanderProps) => {
  return (
    <Expander
      type="single"
      style={{
        backgroundColor: 'var(--amplify-colors-brand-secondary-80)',
        color: 'var(--amplify-colors-white)',
        '--amplify-components-expander-content-text-color':
          'var(--amplify-colors-white)',
      }}
      {...props}
    >
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
