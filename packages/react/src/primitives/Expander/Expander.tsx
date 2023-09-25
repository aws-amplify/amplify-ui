import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassName } from '@aws-amplify/ui';
import { BaseExpanderProps, ExpanderProps } from './types';
import { IconExpandMore, useIcons } from '../Icon';
import { ForwardRefPrimitive, Primitive } from '../types/view';
import { useStableId } from '../utils/useStableId';
import { View } from '../View';
import { ExpanderGroupContext } from './ExpanderGroupContext';

export const EXPANDER_ITEM_TEST_ID = 'expander-item';
export const EXPANDER_HEADER_TEST_ID = 'expander-header';
export const EXPANDER_ICON_TEST_ID = 'expander-icon';
export const EXPANDER_CONTENT_TEXT_TEST_ID = 'expander-content-text';

const ExpanderPrimitive: Primitive<ExpanderProps, 'details'> = (
  { children, className, title, value, ...rest },
  ref
) => {
  const triggerId = useStableId();
  const contentId = useStableId();
  const icons = useIcons('expander');
  const context = React.useContext(ExpanderGroupContext);
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
      className={classNames(ComponentClassName.ExpanderItem, className)}
      data-testid={EXPANDER_ITEM_TEST_ID}
      ref={ref}
    >
      <View
        as="summary"
        className={ComponentClassName.ExpanderHeader}
        data-testid={EXPANDER_HEADER_TEST_ID}
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
          className={ComponentClassName.ExpanderIcon}
          data-testid={EXPANDER_ICON_TEST_ID}
          aria-hidden="true"
        >
          {icons?.more ?? <IconExpandMore />}
        </View>
      </View>
      <View
        aria-labelledby={triggerId}
        className={ComponentClassName.ExpanderContent}
        id={contentId}
      >
        {children}
      </View>
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/expander)
 */
export const Expander: ForwardRefPrimitive<BaseExpanderProps, 'details'> =
  React.forwardRef(ExpanderPrimitive);

Expander.displayName = 'Expander';
