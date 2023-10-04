import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassName } from '@aws-amplify/ui';
import { BaseAccordionItemProps, AccordionItemProps } from './types';
import { ForwardRefPrimitive, Primitive } from '../types/view';
import { View } from '../View';
import { AccordionContext, AccordionItemContext } from './AccordionContext';

const AccordionItemPrimitive: Primitive<AccordionItemProps, 'details'> = (
  { children, className, value, as = 'details', ...rest },
  ref
) => {
  const context = React.useContext(AccordionContext);
  const controlledProps = {};

  if (context?.value && value) {
    if (context.value.includes(value)) {
      controlledProps['open'] = true;
    }
  }

  return (
    <AccordionItemContext.Provider value={value}>
      <View
        {...rest}
        {...controlledProps}
        ref={ref}
        as={as}
        className={classNames(ComponentClassName.AccordionItem, className)}
      >
        {children}
      </View>
    </AccordionItemContext.Provider>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/accordion)
 */
export const AccordionItem: ForwardRefPrimitive<
  BaseAccordionItemProps,
  'details'
> = React.forwardRef(AccordionItemPrimitive);

AccordionItem.displayName = 'AccordionItem';
