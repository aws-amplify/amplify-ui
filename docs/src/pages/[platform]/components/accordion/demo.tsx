import * as React from 'react';
import { Accordion } from '@aws-amplify/ui-react';

import { AccordionPropControls } from './AccordionPropControls';
import { useAccordionProps } from './useAccordionProps';
import { Demo } from '@/components/Demo';
import { demoState } from '@/utils/demoState';

const propsToCode = (AccordionProps) => {
  return (
    `<AccordionGroup` +
    (AccordionProps.type
      ? ` type=${JSON.stringify(AccordionProps.type)}`
      : '') +
    (AccordionProps.type === 'single' && AccordionProps.isCollapsible
      ? ` isCollapsible={${JSON.stringify(AccordionProps.isCollapsible)}}`
      : '') +
    `>
  <Accordion title="Is it accessible?" value="demo-item-1">
    Yes! It adheres to the WAI-ARIA design pattern.
  </Accordion>
  <Accordion title="Can I customize the styling?" value="demo-item-2">
    Of course! See the section on CSS Styling below.
  </Accordion>
  <Accordion
    title="Is it a great way to organize content?"
    value="demo-item-3"
  >
    Most definitely!
  </Accordion>
</Accordion>`
  );
};

const defaultAccordionProps = {
  type: 'single',
  isCollapsible: false,
};

export const AccordionDemo = () => {
  const AccordionProps = useAccordionProps(
    demoState.get(Accordion.displayName) || defaultAccordionProps
  );

  return (
    <Demo
      code={propsToCode(AccordionProps)}
      propControls={<AccordionPropControls {...AccordionProps} />}
    >
      <Accordion isCollapsible={AccordionProps.isCollapsible}>
        <Accordion.Item title="Is it accessible?" value="demo-item-1">
          Yes! It adheres to the WAI-ARIA design pattern.
        </Accordion.Item>
        <Accordion.Item
          title="Can I customize the styling?"
          value="demo-item-2"
        >
          Of course! See the section on CSS Styling below.
        </Accordion.Item>
        <Accordion.Item
          title="Is it a great way to organize content?"
          value="demo-item-3"
        >
          Most definitely!
        </Accordion.Item>
      </Accordion>
    </Demo>
  );
};
