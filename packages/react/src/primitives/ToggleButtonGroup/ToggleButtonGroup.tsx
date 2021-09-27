import classNames from 'classnames';
import React from 'react';

import { useToggleButtonGroup } from './useToggleButtonGroup';
import { Flex } from '../Flex';
import { ComponentClassNames } from '../shared';
import { ToggleButtonGroupProps } from '../types';
export const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({
  alignContent = 'center',
  alignItems = 'center',
  ariaLabel,
  children,
  className,
  direction = 'row',
  gap = 0,
  id,
  isExclusive,
  justifyContent = 'flex-start',
  label,
  labelHidden = true,
  onChange,
  size,
  value,
  variation,
  ...rest
}) => {
  const handleChange = useToggleButtonGroup(onChange, value, isExclusive);
  return (
    <Flex
      alignContent={alignContent}
      alignItems={alignItems}
      aria-label={ariaLabel}
      className={classNames(ComponentClassNames.ToggleButtonGroup, className)}
      direction={direction}
      gap={gap}
      justifyContent={justifyContent}
      role="group"
      {...rest}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
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
