import * as React from 'react';
import { BaseAccordionProps, AccordionProps } from './types';
import { ForwardRefPrimitive, Primitive } from '../types/view';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import { AccordionItem } from './AccordionItem';
import { AccordionContent } from './AccordionContent';
import { AccordionTrigger } from './AccordionTrigger';
import { AccordionIcon } from './AccordionIcon';
import { AccordionContainer } from './AccordionContainer';

const AccordionPrimitive: Primitive<AccordionProps, 'div'> = (
  { items, ...rest },
  ref
) => {
  return (
    <AccordionContainer ref={ref} {...rest}>
      {items?.map(({ content, trigger, value }) => (
        <AccordionItem key={value} value={value}>
          <AccordionTrigger>
            {trigger}
            <AccordionIcon />
          </AccordionTrigger>
          <AccordionContent>{content}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionContainer>
  );
};

type AccordionType = ForwardRefPrimitive<BaseAccordionProps, 'div'> & {
  Container: typeof AccordionContainer;
  Content: typeof AccordionContent;
  Icon: typeof AccordionIcon;
  Item: typeof AccordionItem;
  Trigger: typeof AccordionTrigger;
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/accordion)
 */
const Accordion: AccordionType = Object.assign(
  primitiveWithForwardRef(AccordionPrimitive),
  {
    Container: AccordionContainer,
    Content: AccordionContent,
    Icon: AccordionIcon,
    Item: AccordionItem,
    Trigger: AccordionTrigger,
  }
);

Accordion.displayName = 'Accordion';

export { Accordion };
