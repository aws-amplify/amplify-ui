import * as React from 'react';
import classNames from 'classnames';

import {
  ButtonProps,
  BaseButtonGroupProps,
  Primitive,
  ForwardRefPrimitive,
} from '../types';
import { ComponentClassNames } from '../shared/constants';
import { Flex } from '../Flex';

const ButtonGroupPrimitive: Primitive<BaseButtonGroupProps, 'div'> = (
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
export const ButtonGroup = React.forwardRef(
  ButtonGroupPrimitive
) as ForwardRefPrimitive<BaseButtonGroupProps, 'div'>;

ButtonGroup.displayName = 'ButtonGroup';
