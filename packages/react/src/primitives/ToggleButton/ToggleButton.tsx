import { toggleButtonClasses } from '@aws-amplify/ui';
import * as React from 'react';

import { Button } from '../Button';
import {
  BaseToggleButtonProps,
  ToggleButtonProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { useToggleButton } from './useToggleButton';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const ToggleButtonPrimitive: Primitive<ToggleButtonProps, 'button'> = (
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
      className={toggleButtonClasses(
        {
          _modifiers: [variation, isPressed ? 'pressed' : undefined],
        },
        [className]
      )}
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

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/togglebutton)
 */
export const ToggleButton: ForwardRefPrimitive<
  BaseToggleButtonProps,
  'button'
> = primitiveWithForwardRef(ToggleButtonPrimitive);

ToggleButton.displayName = 'ToggleButton';
