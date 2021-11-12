import * as React from 'react';

import { Flex, Expander, ExpanderItem } from '@aws-amplify/ui-react';

import { Example } from '@/components/Example';
import { useExpanderProps } from '@/components/useExpanderProps';
import { ExpanderPropControls } from '@/components/ExpanderPropControls';

export const ExpanderDemo = () => {
  const props = useExpanderProps({ type: 'single', isCollapsible: false });
  return (
    <Flex direction="column">
      <ExpanderPropControls {...props} />
      <Example>
        <Expander type={props.type} isCollapsible={props.isCollapsible}>
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
      </Example>
    </Flex>
  );
};
