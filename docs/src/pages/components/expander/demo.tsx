import * as React from 'react';
import { Expander, ExpanderItem } from '@aws-amplify/ui-react';

import { ExpanderPropControls } from './ExpanderPropControls';
import { useExpanderProps } from './useExpanderProps';
import { Demo } from '@/components/Demo';

const propsToCode = (expanderProps) => {
  return (
    `<Expander` +
    (expanderProps.type ? ` type=${JSON.stringify(expanderProps.type)}` : '') +
    (expanderProps.type === 'single' && expanderProps.isCollapsible
      ? ` isCollapsible={${JSON.stringify(expanderProps.isCollapsible)}}`
      : '') +
    `>
  <ExpanderItem title="Section 1 title" value="item-1">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </ExpanderItem>
  <ExpanderItem title="Section 2 title" value="item-2">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </ExpanderItem>
  <ExpanderItem title="Section 3 title" value="item-3">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </ExpanderItem>
</Expander>`
  );
};

export const ExpanderDemo = () => {
  const expanderProps = useExpanderProps({
    type: 'single',
    isCollapsible: false,
  });

  return (
    <Demo
      code={propsToCode(expanderProps)}
      propControls={<ExpanderPropControls {...expanderProps} />}
    >
      <Expander
        type={expanderProps.type}
        isCollapsible={expanderProps.isCollapsible}
      >
        <ExpanderItem title="Section 1 title" value="item-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </ExpanderItem>
        <ExpanderItem title="Section 2 title" value="item-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </ExpanderItem>
        <ExpanderItem title="Section 3 title" value="item-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </ExpanderItem>
      </Expander>
    </Demo>
  );
};
