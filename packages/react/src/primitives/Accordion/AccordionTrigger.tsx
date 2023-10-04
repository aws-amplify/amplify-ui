import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassName } from '@aws-amplify/ui';
import { ElementType, PrimitiveProps, BaseViewProps } from '../types/view';
import { ForwardRefPrimitive, Primitive } from '../types/view';
import { View } from '../View';
import { AccordionContext, AccordionItemContext } from './AccordionContext';

interface BaseAccordionTriggerProps extends BaseViewProps {}

type AccordionTriggerProps<Element extends ElementType = 'summary'> =
  PrimitiveProps<BaseAccordionTriggerProps, Element>;

const AccordionTriggerPrimitive: Primitive<AccordionTriggerProps, 'summary'> = (
  { children, className, ...rest },
  ref
) => {
  const context = React.useContext(AccordionContext);
  const value = React.useContext(AccordionItemContext);

  return (
    <View
      {...rest}
      ref={ref}
      as="summary"
      className={classNames(ComponentClassName.AccordionItemTrigger, className)}
      onClick={(e) => {
        if (context?.setValue && value) {
          e.preventDefault();
          context.setValue(value);
        }
      }}
    >
      {children}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/accordion)
 */
export const AccordionTrigger: ForwardRefPrimitive<
  BaseAccordionTriggerProps,
  'summary'
> = React.forwardRef(AccordionTriggerPrimitive);

AccordionTrigger.displayName = 'Accordion.Trigger';
