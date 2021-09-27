import classNames from 'classnames';
import React from 'react';

import { useToggleButton } from './useToggleButton';
import { Button } from '../Button';
import { ToggleButtonProps } from '../types';
import { ComponentClassNames } from '../shared/constants';

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  className,
  children,
  defaultSelected = false,
  isDisabled,
  isSelected,
  onChange,
  onClick,
  size,
  value,
  variation,
  ...rest
}) => {
  const { isPressed, handleClick } = useToggleButton({
    isSelected,
    defaultSelected,
    onChange,
    onClick,
    value,
  });
  return (
    <Button
      aria-pressed={isPressed}
      className={classNames(ComponentClassNames.ToggleButton, className)}
      isDisabled={isDisabled}
      onClick={handleClick}
      size={size}
      type="button"
      variation={variation}
      {...rest}
    >
      {children}
    </Button>
  );
};
