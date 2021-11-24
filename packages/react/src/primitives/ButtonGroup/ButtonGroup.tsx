import * as React from 'react';
import classNames from 'classnames';

import { Flex } from '../Flex';
import {
  ButtonProps,
  ButtonGroupProps,
  PrimitiveWithForwardRef,
} from '../types';
import { ComponentClassNames } from '../shared/constants';

const ButtonGroupPrimitive: PrimitiveWithForwardRef<
  ButtonGroupProps,
  typeof Flex
> = (
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

export const ButtonGroup = React.forwardRef(ButtonGroupPrimitive);

ButtonGroup.displayName = 'ButtonGroup';
