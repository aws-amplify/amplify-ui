import * as React from 'react';

import { Expander, ExpanderItem, ExpanderProps } from '@aws-amplify/ui-react';

export const UncontrolledExpander = ({
  defaultValue,
  type,
  isCollapsible,
  ...rest
}: ExpanderProps) => {
  return (
    <Expander
      defaultValue={defaultValue}
      type={type}
      isCollapsible={isCollapsible}
      {...rest}
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

export const ControlledExpander = ({ type, isCollapsible }: ExpanderProps) => {
  const [value, setValue] = React.useState<string | string[]>();
  return (
    <Expander
      type={type}
      value={value}
      onChange={setValue}
      isCollapsible={isCollapsible}
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
