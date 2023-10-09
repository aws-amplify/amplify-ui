import * as React from 'react';
import { Accordion } from '@aws-amplify/ui-react';

import { AccordionPropControls } from './AccordionPropControls';
import { useAccordionProps } from './useAccordionProps';
import { Demo } from '@/components/Demo';
import { demoState } from '@/utils/demoState';

const propsToCode = (AccordionProps) => {
  return (
    `<Accordion` +
    (AccordionProps.isAlwaysOpen ? ` isAlwaysOpen` : '') +
    (AccordionProps.allowMultiple ? ` allowMultiple` : '') +
    `>
  <Accordion.Item value="demo-item-1">
    <Accordion.Trigger>
      Is it accessible?
      <Accordion.Icon />
    </Accordion.Trigger>
    <Accordion.Content>  
      Yes! It uses HTML native elements: <detials> and <summary>.
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="demo-item-2">
    <Accordion.Trigger>
      Can I customize the styling?
      <Accordion.Icon />
    </Accordion.Trigger>
    <Accordion.Content>  
      Of course! See the section on CSS Styling below.
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="demo-item-3">
    <Accordion.Trigger>
      Is it a great way to organize content?
      <Accordion.Icon />
    </Accordion.Trigger>
    <Accordion.Content>  
      Most definitely!
    </Accordion.Content>
  </Accordion.Item>
</Accordion>`
  );
};

const defaultAccordionProps = {
  allowMultiple: false,
  isAlwaysOpen: false,
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
        isAlwaysOpen={AccordionProps.isAlwaysOpen}
      >
        <Accordion.Item value="demo-item-1">
          <Accordion.Trigger>
            Is it accessible?
            <Accordion.Icon />
          </Accordion.Trigger>
          <Accordion.Content>
            Yes! It adheres to the WAI-ARIA design pattern.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="demo-item-2">
          <Accordion.Trigger>
            Can I customize the styling?
            <Accordion.Icon />
          </Accordion.Trigger>
          <Accordion.Content>
            Of course! See the section on CSS Styling below.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="demo-item-3">
          <Accordion.Trigger>
            Is it a great way to organize content?
            <Accordion.Icon />
          </Accordion.Trigger>
          <Accordion.Content>Most definitely!</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Demo>
  );
};
