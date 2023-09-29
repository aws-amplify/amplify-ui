import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassName } from '@aws-amplify/ui';
import { BaseAccordionItemProps, AccordionItemProps } from './types';
import { IconExpandMore, useIcons } from '../Icon';
import { ForwardRefPrimitive, Primitive } from '../types/view';
import { View } from '../View';
import { AccordionContext } from './AccordionContext';

const AccordionItemPrimitive: Primitive<AccordionItemProps, 'details'> = (
  { children, className, title, value, ...rest },
  ref
) => {
  const icons = useIcons('expander');
  const context = React.useContext(AccordionContext);
  const controlledProps = {};

  if (context?.value && value) {
    if (context.value.includes(value)) {
      controlledProps['open'] = true;
    }
  }

  return (
    <View
      {...rest}
      {...controlledProps}
      as="details"
      className={classNames(ComponentClassName.AccordionItem, className)}
      ref={ref}
    >
      <View
        as="summary"
        className={ComponentClassName.AccordionItemTrigger}
        onClick={(e) => {
          if (context?.setValue && value) {
            e.preventDefault();
            context.setValue(value);
          }
        }}
      >
        <View flex="1">{title}</View>
        <View
          as="span"
          className={ComponentClassName.AccordionItemIcon}
          aria-hidden="true"
        >
          {icons?.more ?? <IconExpandMore />}
        </View>
      </View>
      <View className={ComponentClassName.AccordionItemContent}>
        {children}
      </View>
    </View>
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
