import * as React from 'react';
import { Expander, ExpanderGroup } from '@aws-amplify/ui-react';

import { ExpanderPropControls } from './ExpanderPropControls';
import { useExpanderProps } from './useExpanderProps';
import { Demo } from '@/components/Demo';
import { demoState } from '@/utils/demoState';

const propsToCode = (expanderProps) => {
  return (
    `<ExpanderGroup` +
    (expanderProps.type ? ` type=${JSON.stringify(expanderProps.type)}` : '') +
    (expanderProps.type === 'single' && expanderProps.isCollapsible
      ? ` isCollapsible={${JSON.stringify(expanderProps.isCollapsible)}}`
      : '') +
    `>
  <Expander title="Is it accessible?" value="demo-item-1">
    Yes! It adheres to the WAI-ARIA design pattern.
  </Expander>
  <Expander title="Can I customize the styling?" value="demo-item-2">
    Of course! See the section on CSS Styling below.
  </Expander>
  <Expander
    title="Is it a great way to organize content?"
    value="demo-item-3"
  >
    Most definitely!
  </Expander>
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
      <ExpanderGroup
        type={expanderProps.type}
        isCollapsible={expanderProps.isCollapsible}
      >
        <Expander title="Is it accessible?" value="demo-item-1">
          Yes! It adheres to the WAI-ARIA design pattern.
        </Expander>
        <Expander title="Can I customize the styling?" value="demo-item-2">
          Of course! See the section on CSS Styling below.
        </Expander>
        <Expander
          title="Is it a great way to organize content?"
          value="demo-item-3"
        >
          Most definitely!
        </Expander>
      </ExpanderGroup>
    </Demo>
  );
};
