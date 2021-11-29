import classNames from 'classnames';
import * as React from 'react';

import { useToggleButtonGroup } from './useToggleButtonGroup';
import { Flex } from '../Flex';
import { ComponentClassNames } from '../shared/constants';
import {
  PrimitiveWithForwardRef,
  ToggleButtonProps,
  ToggleButtonGroupProps,
} from '../types';

const ToggleButtonGroupPrimitive: PrimitiveWithForwardRef<
  ToggleButtonGroupProps,
  typeof Flex
> = (
  {
    children,
    className,
    isExclusive,
    onChange,
    size,
    value,
    variation,
    ...rest
  },
  ref
) => {
  const handleChange = useToggleButtonGroup(onChange, value, isExclusive);

  return (
    <Flex
      className={classNames(ComponentClassNames.ToggleButtonGroup, className)}
      ref={ref}
      role="group"
      {...rest}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement<ToggleButtonProps>(child)) {
          return React.cloneElement(child, {
            isPressed: isExclusive
              ? value === child.props.value
              : value.includes(child.props.value),
            onChange: handleChange,
            size,
            variation,
          });
        }
        return child;
      })}
    </Flex>
  );
};

export const ToggleButtonGroup = React.forwardRef(ToggleButtonGroupPrimitive);

ToggleButtonGroup.displayName = 'ToggleButtonGroup';
