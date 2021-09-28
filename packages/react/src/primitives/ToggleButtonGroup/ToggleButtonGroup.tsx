import classNames from 'classnames';
import React from 'react';

import { useToggleButtonGroup } from './useToggleButtonGroup';
import { Flex } from '../Flex';
import { ComponentClassNames } from '../shared';
import { ToggleButtonProps, ToggleButtonGroupProps } from '../types';
export const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({
  ariaLabel,
  children,
  className,
  id,
  isExclusive,
  onChange,
  size,
  value,
  variation,
  ...rest
}) => {
  const handleChange = useToggleButtonGroup(onChange, value, isExclusive);
  return (
    <Flex
      aria-label={ariaLabel}
      className={classNames(ComponentClassNames.ToggleButtonGroup, className)}
      role="group"
      {...rest}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement<ToggleButtonProps>(child)) {
          return React.cloneElement(child, {
            isSelected: isExclusive
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
