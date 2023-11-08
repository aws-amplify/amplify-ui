import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassName } from '@aws-amplify/ui';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import { ElementType, PrimitiveProps, BaseViewProps } from '../types/view';
import { ForwardRefPrimitive, Primitive } from '../types/view';
import { View } from '../View';

interface BaseAccordionContentProps extends BaseViewProps {}

type AccordionContentProps<Element extends ElementType = 'div'> =
  PrimitiveProps<BaseAccordionContentProps, Element>;

const AccordionContentPrimitive: Primitive<AccordionContentProps, 'div'> = (
  { className, children, ...rest },
  ref
) => {
  return (
    <View
      {...rest}
      className={classNames(ComponentClassName.AccordionItemContent, className)}
      ref={ref}
    >
      {children}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/accordion)
 */
export const AccordionContent: ForwardRefPrimitive<
  BaseAccordionContentProps,
  'div'
> = primitiveWithForwardRef(AccordionContentPrimitive);

AccordionContent.displayName = 'Accordion.Content';
