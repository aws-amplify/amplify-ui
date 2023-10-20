import * as React from 'react';
import { BaseAccordionProps, AccordionProps } from './types';
import { ForwardRefPrimitive, Primitive } from '../types/view';
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
      {items?.map((item) => (
        <AccordionItem key={item.value} {...item}>
          <AccordionTrigger>
            {item.trigger}
            <AccordionIcon />
          </AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
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
  React.forwardRef(AccordionPrimitive),
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
