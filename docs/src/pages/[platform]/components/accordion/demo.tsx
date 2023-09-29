import * as React from 'react';
import { Accordion } from '@aws-amplify/ui-react';

import { AccordionPropControls } from './AccordionPropControls';
import { useAccordionProps } from './useAccordionProps';
import { Demo } from '@/components/Demo';
import { demoState } from '@/utils/demoState';

const propsToCode = (AccordionProps) => {
  return (
    `<Accordion` +
    (AccordionProps.allowToggle ? ` allowToggle` : '') +
    (AccordionProps.allowMultiple ? ` allowMultiple` : '') +
    `>
  <Accordion.Item title="Is it accessible?" value="demo-item-1">
    Yes! It adheres to the WAI-ARIA design pattern.
  </Accordion.Item>
  <Accordion.Item title="Can I customize the styling?" value="demo-item-2">
    Of course! See the section on CSS Styling below.
  </Accordion.Item>
  <Accordion.Item
    title="Is it a great way to organize content?"
    value="demo-item-3"
  >
    Most definitely!
  </Accordion.Item>
</Accordion>`
  );
};

const defaultAccordionProps = {
  allowMultiple: false,
  allowToggle: false,
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
      <Accordion
        allowMultiple={AccordionProps.allowMultiple}
        allowToggle={AccordionProps.allowToggle}
      >
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
