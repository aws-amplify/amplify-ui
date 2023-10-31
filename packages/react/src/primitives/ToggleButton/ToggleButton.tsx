import classNames from 'classnames';
import * as React from 'react';

import { classNameModifier, classNameModifierByFlag } from '../shared/utils';
import { Button } from '../Button';
import { ComponentClassName } from '@aws-amplify/ui';
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
  const componentClasses = classNames(
    ComponentClassName.ToggleButton,
    classNameModifier(ComponentClassName.ToggleButton, variation),
    classNameModifierByFlag(
      ComponentClassName.ToggleButton,
      'pressed',
      isPressed
    ),
    className
  );

  return (
    <Button
      aria-pressed={isPressed}
      className={componentClasses}
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
