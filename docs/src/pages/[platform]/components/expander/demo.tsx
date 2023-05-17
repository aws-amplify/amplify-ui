import * as React from 'react';
import { Expander, ExpanderItem } from '@aws-amplify/ui-react';

import { ExpanderPropControls } from './ExpanderPropControls';
import { useExpanderProps } from './useExpanderProps';
import { Demo } from '@/components/Demo';
import { demoState } from '@/utils/demoState';

const propsToCode = (expanderProps) => {
  return (
    `<Expander` +
    (expanderProps.type ? ` type=${JSON.stringify(expanderProps.type)}` : '') +
    (expanderProps.type === 'single' && expanderProps.isCollapsible
      ? ` isCollapsible={${JSON.stringify(expanderProps.isCollapsible)}}`
      : '') +
    `>
  <ExpanderItem title="Is it accessible?" value="demo-item-1">
    Yes! It adheres to the WAI-ARIA design pattern.
  </ExpanderItem>
  <ExpanderItem title="Can I customize the styling?" value="demo-item-2">
    Of course! See the section on CSS Styling below.
  </ExpanderItem>
  <ExpanderItem
    title="Is it a great way to organize content?"
    value="demo-item-3"
  >
    Most definitely!
  </ExpanderItem>
</Expander>`
  );
};

const defaultExpanderProps = {
  type: 'single',
  isCollapsible: false,
};

export const ExpanderDemo = () => {
  const expanderProps = useExpanderProps(
    demoState.get(Expander.displayName) || defaultExpanderProps
  );

  return (
    <Demo
      code={propsToCode(expanderProps)}
      propControls={<ExpanderPropControls {...expanderProps} />}
    >
      <Expander
        type={expanderProps.type}
        isCollapsible={expanderProps.isCollapsible}
      >
        <ExpanderItem title="Is it accessible?" value="demo-item-1">
          Yes! It adheres to the WAI-ARIA design pattern.
        </ExpanderItem>
        <ExpanderItem title="Can I customize the styling?" value="demo-item-2">
          Of course! See the section on CSS Styling below.
        </ExpanderItem>
        <ExpanderItem
          title="Is it a great way to organize content?"
          value="demo-item-3"
        >
          Most definitely!
        </ExpanderItem>
      </Expander>
    </Demo>
  );
};
