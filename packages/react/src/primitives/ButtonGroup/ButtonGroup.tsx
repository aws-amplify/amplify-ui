import * as React from 'react';
import classNames from 'classnames';

import {
  ButtonProps,
  ButtonGroupProps,
  BaseButtonGroupProps,
  Primitive,
  ForwardRefPrimitive,
} from '../types';
import { ComponentClassNames } from '../shared/constants';
import { Flex } from '../Flex';

const ButtonGroupPrimitive: Primitive<ButtonGroupProps, 'div'> = (
  { className, children, role = 'group', size, variation, ...rest },
  ref
) => (
  <Flex
    className={classNames(ComponentClassNames.ButtonGroup, className)}
    role={role}
    ref={ref}
    {...rest}
  >
    {React.Children.map(children, (child) => {
      if (React.isValidElement<ButtonProps>(child)) {
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
  React.forwardRef(ButtonGroupPrimitive);

ButtonGroup.displayName = 'ButtonGroup';
