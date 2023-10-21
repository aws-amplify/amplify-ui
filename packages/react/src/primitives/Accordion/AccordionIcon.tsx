import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassName } from '@aws-amplify/ui';
import { ElementType, PrimitiveProps, BaseViewProps } from '../types/view';
import { IconExpandMore, useIcons } from '../Icon';
import { ForwardRefPrimitive, Primitive } from '../types/view';
import { View } from '../View';

interface BaseAccordionIconProps extends BaseViewProps {}

type AccordionIconProps<Element extends ElementType = 'span'> = PrimitiveProps<
  BaseAccordionIconProps,
  Element
>;

const AccordionIconPrimitive: Primitive<AccordionIconProps, 'span'> = (
  { className, as = 'span', ...rest },
  ref
) => {
  const icons = useIcons('expander');

  return (
    <View
      {...rest}
      ref={ref}
      as={as}
      className={classNames(ComponentClassName.AccordionItemIcon, className)}
      aria-hidden="true"
    >
      {icons?.more ?? <IconExpandMore />}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/accordion)
 */
export const AccordionIcon: ForwardRefPrimitive<
  BaseAccordionIconProps,
  'span'
> = React.forwardRef(AccordionIconPrimitive);

AccordionIcon.displayName = 'Accordion.Icon';
