import * as React from 'react';
import classNames from 'classnames';

import { Flex } from '../Flex';
import { ButtonProps, ButtonGroupProps, Primitive } from '../types';
import { ComponentClassNames } from '../shared/constants';

export const ButtonGroup: Primitive<ButtonGroupProps, typeof Flex> = ({
  className,
  children,
  role = 'group',
  size,
  variation,
  ...rest
}) => (
  <Flex
    className={classNames(ComponentClassNames.ButtonGroup, className)}
    role={role}
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
