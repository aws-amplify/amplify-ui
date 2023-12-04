import * as React from 'react';
import { Accordion } from '@aws-amplify/ui-react';

import { AccordionPropControls } from './AccordionPropControls';
import { useAccordionProps } from './useAccordionProps';
import { Demo } from '@/components/Demo';
import { demoState } from '@/utils/demoState';

const propsToCode = (AccordionProps) => {
  return (
    `<Accordion` +
    (AccordionProps.preventCollapse ? ` preventCollapse` : '') +
    (AccordionProps.allowMultiple ? ` allowMultiple` : '') +
    `
  items={[
    {
      trigger: 'Is it accessible?',
      value: 'accessible',
      content: 'Yes! It uses HTML native elements: <details> and <summary>.'
    },
    {
      trigger: 'Can I customize the styling?',
      value: 'styling',
      content: 'Of course! See the section on CSS Styling below.'
    },
    {
      trigger: 'Is it a great way to organize content?',
      value: 'content',
      content: 'Most definitely!'
    }
  ]}
/>`
  );
};

const defaultAccordionProps = {
  allowMultiple: false,
  preventCollapse: false,
};

export const AccordionDemo = () => {
  const AccordionProps = useAccordionProps(
    demoState.get(Accordion.displayName) || defaultAccordionProps
  );
  console.log(AccordionProps);

  return (
    <Demo
      code={propsToCode(AccordionProps)}
      propControls={<AccordionPropControls {...AccordionProps} />}
    >
      <Accordion
        allowMultiple={AccordionProps.allowMultiple}
        preventCollapse={AccordionProps.preventCollapse}
        items={[
          {
            trigger: 'Is it accessible?',
            value: 'accessible',
            content:
              'Yes! It uses HTML native elements: <details> and <summary>.',
          },
          {
            trigger: 'Can I customize the styling?',
            value: 'styling',
            content: 'Of course! See the section on CSS Styling below.',
          },
          {
            trigger: 'Is it a great way to organize content?',
            value: 'content',
            content: 'Most definitely!',
          },
        ]}
      />
    </Demo>
  );
};
