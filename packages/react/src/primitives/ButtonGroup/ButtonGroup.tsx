import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassName } from '@aws-amplify/ui';

import {
  ButtonProps,
  ButtonGroupProps,
  BaseButtonGroupProps,
  Primitive,
  ForwardRefPrimitive,
} from '../types';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import { Flex } from '../Flex';

const ButtonGroupPrimitive: Primitive<ButtonGroupProps, 'div'> = (
  {
    className,
    children,
    role = 'group',
    size: _size,
    variation: _variation,
    ...rest
  },
  ref
) => (
  <Flex
    className={classNames(ComponentClassName.ButtonGroup, className)}
    role={role}
    ref={ref}
    {...rest}
  >
    {React.Children.map(children, (child) => {
      if (React.isValidElement<ButtonProps>(child)) {
        const { size = _size, variation = _variation } = child.props;
        return React.cloneElement(child, { size, variation });
      }
      return child;
    })}
  </Flex>
);

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/button#buttongroup)
 */
export const ButtonGroup: ForwardRefPrimitive<BaseButtonGroupProps, 'div'> =
  primitiveWithForwardRef(ButtonGroupPrimitive);

ButtonGroup.displayName = 'ButtonGroup';
