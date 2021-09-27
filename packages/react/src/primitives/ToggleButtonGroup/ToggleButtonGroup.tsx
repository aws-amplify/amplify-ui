import classNames from 'classnames';
import React from 'react';

import { Flex } from '../Flex';
import { ComponentClassNames } from '../shared';
import { ToggleButtonProps, ToggleButtonGroupProps } from '../types';
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
  // Multiple selection
  const handleChange: ToggleButtonProps['onChange'] = (e, buttonValue) => {
    if (!onChange || !Array.isArray(value)) {
      return;
    }

    const index = value.indexOf(buttonValue);
    let newValue;

    if (index >= 0) {
      newValue = [...value];
      newValue.splice(index, 1);
    } else {
      newValue = [...value, buttonValue];
    }

    onChange(e, newValue);
  };

  // Exclusive selection
  const handleExclusiveChange: ToggleButtonProps['onChange'] = (
    e,
    buttonValue
  ) => {
    if (!onChange) {
      return;
    }

    onChange(e, value === buttonValue ? null : buttonValue);
  };
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
            onChange: isExclusive ? handleExclusiveChange : handleChange,
            size,
            variation,
          });
        }
        return child;
      })}
    </Flex>
  );
};
