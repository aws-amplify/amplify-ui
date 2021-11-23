import classNames from 'classnames';
import * as React from 'react';

import { useToggleButton } from './useToggleButton';
import { Button } from '../Button';
import { ToggleButtonProps, PrimitiveWithForwardRef } from '../types';
import { ComponentClassNames } from '../shared/constants';

const ToggleButtonPrimitive: PrimitiveWithForwardRef<
  ToggleButtonProps,
  typeof Button
> = (
  {
    className,
    children,
    defaultPressed = false,
    isDisabled,
    isPressed: isPressedProp,
    onChange,
    onClick,
    size,
    value,
    variation,
    ...rest
  },
  ref
) => {
  const { isPressed, handleClick } = useToggleButton({
    isPressed: isPressedProp,
    defaultPressed,
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
      ref={ref}
      size={size}
      type="button"
      variation={variation}
      {...rest}
    >
      {children}
    </Button>
  );
};

export const ToggleButton = React.forwardRef(ToggleButtonPrimitive);

ToggleButton.displayName = 'ToggleButton';
